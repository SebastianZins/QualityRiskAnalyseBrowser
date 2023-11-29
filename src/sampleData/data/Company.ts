import { materialMovements } from "./MaterialMovement";
import { Company } from "../types/Company.type";


export let companies : Array<Company> = [
    {
        companyID : "0000196141",
        companyName : "Test Customer"
    }
]

materialMovements.filter(item => item.supplierID != "" || item.customerID != "").forEach(element => {
    const compID = element.customerID != "" ? element.customerID : element.supplierID;
    companies.push({
        companyID: compID,
        companyName: "Company "+ compID
    } as Company)
});