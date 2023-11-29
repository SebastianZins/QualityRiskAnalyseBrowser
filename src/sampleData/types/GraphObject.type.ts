import { nodeType } from "@/features/qualityRiskAssessmentBrowser/utils/TreeNode";

export type graphNode = {
    id: string;
    type: nodeType;
    parent: string;
    materialID: string;
    batchID: string;
};

export type treeType = {
    children: Array<treeType>;
    id: string;
    type: nodeType;
    companyName: string;
    parent: string;
    materialID: string;
    materialName: string;
    batchID: string;
    isExpanded: boolean;
    isSelected: boolean
    scores: Array<{
        ILOTID: string;
        measurements: Array<{
            score: number;
            characterName: string,
            characterNr: string,
            characterID : string,
            unit : string,
            unitText : string,
            maxSpec : number | null,
            minSpec: number | null,
            methode : string,
            maxWarning: number | null,
            minWarning : number | null
        }>;
    }>;
};