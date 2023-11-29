import { materials } from "../data/Material";

export function handleGetMaterialName(materialID: string): string {
    const ret = materials.find(
        (item) => item.materialID == materialID
    )?.materialName;
    if (ret === undefined) {
        return "";
        //throw new Error("Error 404: Company not found.");
    }
    return ret;
}
