import { companies } from "../data/Company";

export function handleGetCompanyName(companyID: string): string {
    const ret = companies.find(
        (item) => item.companyID == companyID
    )?.companyName;
    if (ret === undefined) {
        return ""; //throw new Error("Error 404: Company not found.");
    }
    return ret;
}
