import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { ILOT, MeasurementsValues } from "@/sampleData/types/ILOT.type";

import useStyles from "./QualityRiskAssessmentBrowserPageContent.styles";

import { ILOTData as ilotData } from "@/sampleData/data/ILOTData";
import TreeChardCard from "../cards/TreeChartCard";
import MeasurementTableCard from "../cards/MeasurementTableCard";
import DateTimeSeriesCard from "../cards/DateTimeSeriesCard";
import HistogramCard from "../cards/HistogramCard";
import { createGraph } from "@/sampleData/data/GraphObjects";
import { treeType } from "@/sampleData/types/GraphObject.type";
import { getDateLineChart, getValueLineChart } from "../plots/LineChart";

function QualityRiskAssessmentBrowserPageContent() {
    const { classes } = useStyles();
    const [hydrated, setHydrated] = useState(false);

    const [ILOTData, setILOTData] = useState(ilotData);
    const [treeData, setTreeData] = useState(createGraph(ILOTData));
    const [state, setState] = useState("init");

    const [selectedNode, setSelectedNode] = useState<treeType>();
    const [selectedILOT, setSelectedILOT] = useState<string>();
    const [selectedMeasurement, setSelectedMeasurement] = useState<string>();
    const [selectedMeasurementData, setSelectedMeasurementData] = useState<
        ILOT[]
    >([]);
    const [selectedItem, setSelectedItem] = useState<{
        date: Date;
        value: number;
    }>();
    const [aggregatedMeasurements, setAggregatedMeasurements] =
        useState<MeasurementsValues>();

    const handleUpdateSelectedNode = (treeNode: treeType) => {
        setSelectedNode(treeNode);
        setSelectedILOT(undefined);
        setSelectedMeasurement(undefined);
        setSelectedMeasurementData([]);
        setAggregatedMeasurements(undefined);
        setSelectedItem(undefined);
        setState("node selected");
    };

    const handleUpdateSelectedILOT = (ILOTID: string) => {
        setSelectedILOT(ILOTID);
        setSelectedMeasurement(undefined);
        setAggregatedMeasurements(undefined);
        setSelectedItem(undefined);
        setState("ilot selected");
    };

    const handleUpdateSelectedMeasurement = (charID: string) => {
        setSelectedMeasurement(charID);
        const newSelectedMeasurementData = ILOTData.filter(
            (item) =>
                selectedNode != undefined &&
                item.materialID == selectedNode?.materialID &&
                item.characterID == charID
        ).sort((a, b) => (getDateLineChart(a) > getDateLineChart(b) ? -1 : 1));
        setSelectedMeasurementData(newSelectedMeasurementData);

        const data = ILOTData.filter(
            (item) =>
                selectedNode != undefined &&
                item.materialID == selectedNode?.materialID &&
                item.characterID == selectedMeasurement
        );
        const aggregatedData: MeasurementsValues = {
            ...data[0],
            values: new Array<{ value: number; count: number }>(),
        };
        data.forEach((item) => {
            const foundItem = aggregatedData.values.find(
                (findItem) => findItem.value == item.value
            );
            if (foundItem == undefined) {
                aggregatedData.values.push({ value: item.value, count: 1 });
            } else {
                foundItem.count += 1;
            }
        });
        setAggregatedMeasurements(aggregatedData);
        const selectedILOTValue = ILOTData.find(
            (item) =>
                item.ILOTID == selectedILOT &&
                item.batchID == selectedNode?.batchID &&
                item.materialID == selectedNode.materialID &&
                item.characterID == selectedMeasurement
        );
        setSelectedItem(
            selectedILOTValue?.analyseTime
                ? {
                      date: getDateLineChart(selectedILOTValue),
                      value: getValueLineChart(selectedILOTValue),
                  }
                : undefined
        );

        setState("measurement selected");
    };

    useEffect(() => {
        setHydrated(true);
    }, [state]);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    console.log(state);

    return (
        <div>
            <div className={classes.appLayoutWrapper}>
                <TreeChardCard
                    data={treeData}
                    handleUpdateSelectedMaterial={handleUpdateSelectedNode}
                />
                <MeasurementTableCard
                    node={selectedNode}
                    selectedILOT={selectedILOT}
                    handleUpdateMeasurements={handleUpdateSelectedMeasurement}
                    handleUpdateSelectedILOT={handleUpdateSelectedILOT}
                />
                <DateTimeSeriesCard
                    measurements={selectedMeasurementData}
                    selected={selectedItem?.date || undefined}
                />
                <HistogramCard
                    values={aggregatedMeasurements}
                    selected={selectedItem?.value || undefined}
                />
            </div>
        </div>
    );
}

export default QualityRiskAssessmentBrowserPageContent;
