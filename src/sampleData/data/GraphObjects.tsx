import { processOrders } from "./ProcessOrder";
import { materialMovements } from "./MaterialMovement";
import { nodeType } from "@/features/qualityRiskAssessmentBrowser/utils/TreeNode";
import { handleGetCompanyName } from "../handler/handleGetCompanyName";
import { handleGetMaterialName } from "../handler/handleGetMaterialName";
import { mean, median, variance, deviation } from "d3-array";
import { max, min } from "d3";
import { graphNode, treeType } from "../types/GraphObject.type";
import { ILOT } from "../types/ILOT.type";

export function createGraph(ILOTData: ILOT[]) {
    var allNode = new Array<graphNode>();

    materialMovements.forEach((movFor) => {
        if (movFor.movementType === 601) {
            var entryExistsEnd = allNode.find(
                (node) => node.id === movFor.customerID
            );
            if (entryExistsEnd === undefined) {
                allNode.push({
                    id: movFor.customerID,
                    type: nodeType.EndProduct,
                    parent: "",
                    materialID: movFor.materialID,
                    batchID: movFor.batchID,
                });
            }
            var foundProcessOrderBevor = processOrders.find(
                (orderFind) => orderFind.batchID === movFor.batchID
            );
            var entryExistsMid = allNode.find(
                (node) => node.id === foundProcessOrderBevor?.processOrderID
            );
            if (entryExistsMid === undefined) {
                allNode.push({
                    id: foundProcessOrderBevor?.processOrderID || "",
                    type: nodeType.ProcessOrder,
                    parent: movFor.customerID,
                    materialID: movFor.materialID,
                    batchID: movFor.batchID,
                });
            }
        } else {
            var foundProcessOrderBevor = processOrders.find(
                (orderFind) => orderFind.batchID === movFor.batchID
            );
            if (foundProcessOrderBevor === undefined) {
                var entryExists = allNode.findIndex(
                    (node) => node.id === movFor.supplierID
                );
                if (entryExists === -1) {
                    allNode.push({
                        id: movFor.supplierID,
                        type: nodeType.RawMaterial,
                        parent: movFor.processOrderID,
                        materialID: movFor.materialID,
                        batchID: movFor.batchID,
                    });
                }
            } else {
                var entryExists = allNode.findIndex(
                    (node) => node.id === foundProcessOrderBevor?.processOrderID
                );
                if (entryExists === -1) {
                    allNode.push({
                        id: foundProcessOrderBevor.processOrderID,
                        type: nodeType.ProcessOrder,
                        parent: movFor.processOrderID,
                        materialID: movFor.materialID,
                        batchID: movFor.batchID,
                    });
                }
            }
        }
    });

    var root = allNode.find((element) => element.type === nodeType.EndProduct);
    if (root === undefined) {
        throw new Error("root not found");
    }

    const arrayToTree = (
        arr: Array<graphNode>,
        parent: string,
        ILOTData: ILOT[]
    ): Array<treeType> =>
        arr
            .filter((item: graphNode) => item.parent === parent)
            .map((child: graphNode) => {
                return {
                    ...child,
                    children: arrayToTree(arr, child.id, ILOTData),
                    isExpanded: false,
                    isSelected: false,
                    materialName: handleGetMaterialName(child.materialID),
                    companyName:
                        child.type === nodeType.ProcessOrder
                            ? ""
                            : handleGetCompanyName(child.id),
                    scores: calculateRiskScore({
                        materialID: child.materialID,
                        batchID: child.batchID,
                        ILOTData,
                    }),
                };
            });
    const test = arrayToTree(allNode, root.id, ILOTData);
    return {
        children: test,
        id: root.id,
        type: root.type,
        parent: "",
        materialID: root.materialID,
        isExpanded: false,
        batchID: root.batchID,
        scores: calculateRiskScore({
            materialID: root.materialID,
            batchID: root.batchID,
            ILOTData,
        }),
    } as treeType;
}

export const calculateRiskScore = (selected: {
    materialID: string;
    batchID: string;
    ILOTData: ILOT[];
}) => {
    const thisItemsMeasurements = selected.ILOTData.filter(
        (item) =>
            item.batchID == selected.batchID &&
            item.materialID == selected.materialID
    );

    const thisItemILOTs = Array<string>();
    thisItemsMeasurements.forEach((item) => {
        if (
            thisItemILOTs.find((itemFind) => itemFind == item.ILOTID) ==
            undefined
        ) {
            thisItemILOTs.push(item.ILOTID);
        }
    });

    const allMeasurements = selected.ILOTData.filter(
        (item) => item.materialID == selected.materialID
    );

    const allMeasurementsGrouped = Array<{
        characterID: string;
        items: ILOT[];
    }>();
    allMeasurements.forEach((item) => {
        const findItem = allMeasurementsGrouped.find(
            (itemFind) => item.characterID == itemFind.characterID
        );
        if (findItem == undefined) {
            allMeasurementsGrouped.push({
                characterID: item.characterID,
                items: [item],
            });
        } else {
            findItem.items.push(item);
        }
    });

    const allMeasurementsGroupedCalculated = Array<{
        characterID: string;
        mean: number | undefined;
        median: number | undefined;
        variance: number | undefined;
        leftStandardDeviation: number | undefined;
        rightStandardDeviation: number | undefined;
        valuesLength: number | undefined;
        max: number | undefined;
        min: number | undefined;
        // percentiles: number[];
    }>();

    allMeasurementsGrouped.forEach((group) => {
        const values = group.items
            .map((item) => item.value)
            .sort((a, b) => (a > b ? 1 : -1));

        const valuesLeft =
            values.length > 1
                ? values.slice(0, Math.floor(values.length / 2))
                : [];
        const valuesRight =
            values.length > 0
                ? values.slice(Math.floor(values.length / 2), -1)
                : [];

        allMeasurementsGroupedCalculated.push({
            characterID: group.characterID,
            mean: mean(values),
            median: median(values),
            variance: variance(values),
            leftStandardDeviation: deviation(values),
            rightStandardDeviation: deviation(values),
            valuesLength: values.length,
            max: max(values),
            min: min(values),
            // percentiles: range(10).map((i) => quantile(values, 1 / i) || 0),
        });
    });

    const scoreValues = Array<{
        ILOTID: string;
        measurements: Array<{
            characterID: string;
            characterName: string;
            characterNr: string;
            unit: string;
            unitText: string;
            maxSpec: number | null;
            minSpec: number | null;
            methode: string;
            maxWarning: number | null;
            minWarning: number | null;
            score: number;
        }>;
    }>();

    thisItemILOTs.forEach((itemILOT) => {
        const tmpScoreValues = {
            ILOTID: itemILOT,
            measurements: Array<{
                characterID: string;
                characterName: string;
                characterNr: string;
                unit: string;
                unitText: string;
                maxSpec: number | null;
                minSpec: number | null;
                methode: string;
                maxWarning: number | null;
                minWarning: number | null;
                score: number;
            }>(),
        };
        thisItemsMeasurements
            .filter((i) => i.ILOTID == itemILOT)
            .forEach((itemMeasurements) => {
                const comparisonValues = allMeasurementsGroupedCalculated.find(
                    (i) => i.characterID == itemMeasurements.characterID
                );

                const newScoreItem = {
                    characterID: itemMeasurements.characterID,
                    characterName: itemMeasurements.characterName,
                    characterNr: itemMeasurements.characterNr,
                    unit: itemMeasurements.unit,
                    unitText: itemMeasurements.unitText,
                    minSpec: itemMeasurements.minSpec,
                    maxSpec: itemMeasurements.maxSpec,
                    methode: itemMeasurements.methode,
                    maxWarning: itemMeasurements.maxWarning,
                    minWarning: itemMeasurements.minWarning,
                    score: 0,
                };

                // if no comparable measurements exist, return a perfect score
                if (
                    comparisonValues == undefined ||
                    comparisonValues.max == undefined ||
                    comparisonValues.min == undefined ||
                    comparisonValues.leftStandardDeviation == undefined ||
                    comparisonValues.rightStandardDeviation == undefined ||
                    comparisonValues.variance == undefined ||
                    comparisonValues.mean == undefined ||
                    comparisonValues.median == undefined ||
                    comparisonValues.characterID == "" ||
                    comparisonValues.valuesLength == 0
                ) {
                    tmpScoreValues.measurements.push(newScoreItem);
                    return;
                }

                const maxValueConsiderable =
                    itemMeasurements.maxWarning != null
                        ? itemMeasurements.maxWarning
                        : itemMeasurements.maxSpec != null
                        ? itemMeasurements.maxSpec
                        : comparisonValues.max;
                const minValueConsiderable =
                    itemMeasurements.minWarning != null
                        ? itemMeasurements.minWarning
                        : itemMeasurements.minSpec != null
                        ? itemMeasurements.minSpec
                        : comparisonValues.min > 0
                        ? 0
                        : comparisonValues.min;

                // if value trespasses upper threshold (warning value), return ncm score (5)
                if (itemMeasurements.value > maxValueConsiderable) {
                    newScoreItem.score = 5;
                    tmpScoreValues.measurements.push(newScoreItem);
                    return;
                }

                // if value trespasses lower threshold (warning value), return ncm score (5)
                if (itemMeasurements.value < minValueConsiderable) {
                    newScoreItem.score = 5;
                    tmpScoreValues.measurements.push(newScoreItem);
                    return;
                }

                // check if values is left or right of distribution mean
                if (itemMeasurements.value >= comparisonValues.mean) {
                    const stdDevStepsAfter1 =
                        (maxValueConsiderable - comparisonValues.mean) / 3;
                    if (
                        itemMeasurements.value <=
                        comparisonValues.mean +
                            comparisonValues.rightStandardDeviation
                    ) {
                        newScoreItem.score = 1;
                        tmpScoreValues.measurements.push(newScoreItem);
                    } else if (
                        itemMeasurements.value <=
                        comparisonValues.mean +
                            comparisonValues.rightStandardDeviation +
                            stdDevStepsAfter1
                    ) {
                        newScoreItem.score = 2;
                        tmpScoreValues.measurements.push(newScoreItem);
                    } else if (
                        itemMeasurements.value <=
                        comparisonValues.mean +
                            comparisonValues.rightStandardDeviation +
                            stdDevStepsAfter1 * 2
                    ) {
                        newScoreItem.score = 3;
                        tmpScoreValues.measurements.push(newScoreItem);
                    } else {
                        newScoreItem.score = 4;
                        tmpScoreValues.measurements.push(newScoreItem);
                    }
                } else {
                    const stdDevStepsAfter1 =
                        (minValueConsiderable - comparisonValues.mean) / 3;
                    if (
                        itemMeasurements.value <=
                        comparisonValues.mean +
                            comparisonValues.leftStandardDeviation
                    ) {
                        newScoreItem.score = 1;
                        tmpScoreValues.measurements.push(newScoreItem);
                    } else if (
                        itemMeasurements.value <=
                        comparisonValues.mean +
                            comparisonValues.leftStandardDeviation +
                            stdDevStepsAfter1
                    ) {
                        newScoreItem.score = 2;
                        tmpScoreValues.measurements.push(newScoreItem);
                    } else if (
                        itemMeasurements.value <=
                        comparisonValues.mean +
                            comparisonValues.leftStandardDeviation +
                            stdDevStepsAfter1 * 2
                    ) {
                        newScoreItem.score = 3;
                        tmpScoreValues.measurements.push(newScoreItem);
                    } else {
                        newScoreItem.score = 4;
                        tmpScoreValues.measurements.push(newScoreItem);
                    }
                }

                // // get percentile affiliation of value
                // const percentile = bisect(
                //     comparisonValues.percentiles,
                //     itemMeasurements.value
                // );
                // tmpScoreValues.measurements.push({
                //     characterID: itemMeasurements.characterID,
                //     score: Math.abs((percentile - 5) % 5),
                // });
            });
        scoreValues.push(tmpScoreValues);
    });

    return scoreValues;
};
