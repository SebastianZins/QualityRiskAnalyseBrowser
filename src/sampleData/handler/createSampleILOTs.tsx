import { processOrders } from "../data/ProcessOrder";
import { getRawMaterials } from "../data/MaterialMovement";
import { ILOTMeasurements } from "../data/ILOTData";
import Rand from "rand-seed";
import { ILOT } from "../types/ILOT.type";

const valueFunction = (x: number) => {
    return Math.floor(Math.pow(x, 4) * 90 * 10) / 10;
};

export function createSampleILOTs() {
    const ILOTs = Array<ILOT>();

    const random = new Rand("sample");
    // loop through every processOrder
    processOrders.forEach((process) => {
        // create between 1 and 4 ilots for this process order
        for (let i = 1; i <= Math.floor(Math.random() * 3) + 1; i++) {
            // loop through every possible measurement of this process order (sample)

            const ilotID = Math.floor(random.next() * 10000);
            ILOTMeasurements.forEach((sample) => {
                // create new ilot sample
                ILOTs.push({
                    batchID: process.batchID,
                    ILOTID: ilotID.toString() + "-" + i,
                    materialID: process.materialID,
                    characterName: sample.CHARNAME,
                    characterNr: sample.CHARNR,
                    characterID: sample.CHARID,
                    value: valueFunction(random.next()), // gets a random value between 0 and 100 with two zero digits
                    validation: i == 1 ? "A" : "R",
                    unit: "kg",
                    unitText: "Kilo gramm",
                    maxSpec: 100,
                    minSpec: 0,
                    variance: 0,
                    median: 0,
                    analyseTime:
                        "2023-01-" +
                        (
                            ((Number(process.batchID) ||
                                valueFunction(random.next())) %
                                27) +
                            1
                        )
                            .toString()
                            .padStart(2, "0") +
                        "T00:" +
                        (10 - i).toString().padStart(2, "0") +
                        ":" +
                        Math.floor(random.next() * 60)
                            .toString()
                            .padStart(2, "0"),
                    creationTime:
                        "2023-01-" +
                        (
                            ((Number(process.batchID) ||
                                valueFunction(random.next())) %
                                27) +
                            1
                        )
                            .toString()
                            .padStart(2, "0") +
                        "T00:" +
                        (10 - i).toString().padStart(2, "0") +
                        ":" +
                        Math.floor(random.next() * 60)
                            .toString()
                            .padStart(2, "0"),
                    methode: sample.OPNAME,
                    maxWarning: 95,
                    minWarning: null,
                });
            });
        }
    });

    // loop through every raw Material
    getRawMaterials().forEach((material) => {
        // create between 1 and 4 ilots for this raw material
        for (let i = 1; i <= Math.floor(Math.random() * 3) + 1; i++) {
            // loop through every possible measurement of this raw material (sample)

            const ilotID = Math.floor(random.next() * 10000);
            ILOTMeasurements.forEach((sample) => {
                // create new ilot sample
                ILOTs.push({
                    batchID: material.batchID,
                    ILOTID: ilotID.toString() + "-" + i,
                    materialID: material.materialID,
                    characterName: sample.CHARNAME,
                    characterNr: sample.CHARNR,
                    characterID: sample.CHARID,
                    value: valueFunction(random.next()), // gets a random value between 0 and 100 with two zero digits
                    validation: i == 1 ? "A" : "R",
                    unit: "kg",
                    unitText: "Kilo gramm",
                    maxSpec: 100,
                    minSpec: 0,
                    variance: 0,
                    median: 0,
                    analyseTime:
                        "2023-01-" +
                        (
                            ((Number(material.batchID) ||
                                valueFunction(random.next())) %
                                27) +
                            1
                        )
                            .toString()
                            .padStart(2, "0") +
                        "T00:" +
                        (10 - i).toString().padStart(2, "0") +
                        ":" +
                        Math.floor(random.next() * 60)
                            .toString()
                            .padStart(2, "0"),
                    creationTime:
                        "2023-01-" +
                        (
                            ((Number(material.batchID) ||
                                valueFunction(random.next())) %
                                27) +
                            1
                        )
                            .toString()
                            .padStart(2, "0") +
                        "T00:" +
                        (10 - i).toString().padStart(2, "0") +
                        ":" +
                        Math.floor(random.next() * 60)
                            .toString()
                            .padStart(2, "0"),
                    methode: sample.OPNAME,
                    maxWarning: 100,
                    minWarning: null,
                });
            });
        }
    });

    return ILOTs;
}
