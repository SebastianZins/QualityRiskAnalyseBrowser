export type ILOT = {
    batchID : string,
    ILOTID : string,
    materialID : string,
    characterName: string,
    characterNr: string,
    characterID : string,
    value : number,
    validation : string,
    unit : string,
    unitText : string,
    maxSpec : number | null,
    minSpec: number | null,
    variance : number,
    median : number,
    analyseTime : string,
    creationTime : string,
    methode : string,
    maxWarning: number | null,
    minWarning : number | null
}

export interface MeasurementsValues {
    materialID: string;
    characterName: string;
    characterNr: string;
    characterID: string;
    unit: string;
    unitText: string;
    maxSpec: number | null;
    minSpec: number | null;
    methode: string;
    maxWarning: number | null;
    minWarning: number | null;
    values: {
        value: number;
        count: number;
    }[];
}