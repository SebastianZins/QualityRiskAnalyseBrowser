import { MaterialMovement } from "../types/MaterialMovement.type"

export const getEndProducts = () => {
    return materialMovements.filter(material => material.movementType === 601)
}

export const getRawMaterials = () => {
    return materialMovements.filter(material => material.supplierID != "")
}

export const materialMovements : Array<MaterialMovement> = [
    {
        processOrderID : "",
        batchID : "0026208332",
        materialID : "000000000050686827",
        movementType: 601,
        customerID : "0000196141",
        supplierID : "",
        quantity : 4800,
        unit : ""
    },
    {
        processOrderID : "",
        batchID : "0026208332",
        materialID : "000000000050686827",
        movementType: 601,
        customerID : "0000196141",
        supplierID : "",
        quantity : 5400,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "5000028821",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "1",
        quantity : 1193.077,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "5000028821",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "1",
        quantity : 246.923,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "5000028807",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "2",
        quantity : 477.692,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "5000028720",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "3",
        quantity : 92.308,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "5000028720",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "3",
        quantity : 1086.923,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "5000028720",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "3",
        quantity : 980.769,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "5000028719",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "4",
        quantity : 1449.231,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "5000028719",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "4",
        quantity : 632.307,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026163815",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "5",
        quantity : 241.538,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026163815",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "5",
        quantity : 146.769,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026163815",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "5",
        quantity : 362.308,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026163815",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "5",
        quantity : 724.615,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026128028",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "",
        quantity : 724.615,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026128028",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "",
        quantity : 362.308,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026128028",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "",
        quantity : 241.538,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026128028",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "",
        quantity : 483.077,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026128028",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "",
        quantity : 201.308,
        unit : ""
    },
    {
        processOrderID : "000210538901",
        batchID : "0026079314",
        materialID : "000000000050602769",
        movementType: 261,
        customerID : "",
        supplierID : "7",
        quantity : 40.23,
        unit : ""
    },
    {
        processOrderID : "000210470336",
        batchID : "TIN 622 SF",
        materialID : "000000000010913905",
        movementType: 261,
        customerID : "",
        supplierID : "7",
        quantity : 4200,
        unit : ""
    },
    {
        processOrderID : "000210470336",
        batchID : "TIN 622 SF",
        materialID : "000000000010913905",
        movementType: 261,
        customerID : "",
        supplierID : "7",
        quantity : 18600,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "123210726",
        materialID : "000000000055293882",
        movementType: 261,
        customerID : "",
        supplierID : "8",
        quantity : 1100,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "0001022157",
        materialID : "000000000055293670",
        movementType: 261,
        customerID : "",
        supplierID : "9",
        quantity : 15,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "0001022157",
        materialID : "000000000055293670",
        movementType: 261,
        customerID : "",
        supplierID : "9",
        quantity : 60,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "G1K0214",
        materialID : "000000000055292928",
        movementType: 261,
        customerID : "",
        supplierID : "10",
        quantity : 175,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "7467004",
        materialID : "000000000055482930",
        movementType: 261,
        customerID : "",
        supplierID : "11",
        quantity : 605,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "3263106348",
        materialID : "000000000056481241",
        movementType: 261,
        customerID : "",
        supplierID : "12",
        quantity : 400,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "2101023705",
        materialID : "000000000055292557",
        movementType: 261,
        customerID : "",
        supplierID : "13",
        quantity : 5,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "3059082",
        materialID : "000000000055292345",
        movementType: 261,
        customerID : "",
        supplierID : "14",
        quantity : 3000,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "21523564",
        materialID : "000000000055292345",
        movementType: 261,
        customerID : "",
        supplierID : "15",
        quantity : 417,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "05163740LS",
        materialID : "000000000010897968",
        movementType: 261,
        customerID : "",
        supplierID : "16",
        quantity : 1550,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "PMA-009686",
        materialID : "000000000055292186",
        movementType: 261,
        customerID : "",
        supplierID : "17",
        quantity : 1267,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "12037025",
        materialID : "000000000050283699",
        movementType: 261,
        customerID : "",
        supplierID : "18",
        quantity : 38,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "0001100430",
        materialID : "000000000050283699",
        movementType: 261,
        customerID : "",
        supplierID : "19",
        quantity : 20,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "25877840MZ",
        materialID : "000000000055201980",
        movementType: 261,
        customerID : "",
        supplierID : "20",
        quantity : 27,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "0025499497",
        materialID : "000000000055201980",
        movementType: 261,
        customerID : "",
        supplierID : "21",
        quantity : 70,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "EBM2106056",
        materialID : "000000000055290967",
        movementType: 261,
        customerID : "",
        supplierID : "22",
        quantity : 1000,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "HC00H",
        materialID : "000000000050077180",
        movementType: 261,
        customerID : "",
        supplierID : "23",
        quantity : 689,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "2022201377",
        materialID : "000000000055290437",
        movementType: 261,
        customerID : "",
        supplierID : "24",
        quantity : 320,
        unit : ""
    },
    {
        processOrderID : "000210470192",
        batchID : "2021430854",
        materialID : "000000000055290437",
        movementType: 261,
        customerID : "",
        supplierID : "25",
        quantity : 597,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "PMA-009682",
        materialID : "000000000055292186",
        movementType: 261,
        customerID : "",
        supplierID : "26",
        quantity : 1267,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "HC00H",
        materialID : "000000000050077180",
        movementType: 261,
        customerID : "",
        supplierID : "28",
        quantity : 689,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "G1J0321",
        materialID : "000000000055292928",
        movementType: 261,
        customerID : "",
        supplierID : "29",
        quantity : 175,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "G07-210726",
        materialID : "000000000055293882",
        movementType: 261,
        customerID : "",
        supplierID : "30",
        quantity : 1100,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "EBM2104029",
        materialID : "000000000055290967",
        movementType: 261,
        customerID : "",
        supplierID : "31",
        quantity : 1000,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "45438756P0",
        materialID : "000000000055482930",
        movementType: 261,
        customerID : "",
        supplierID : "32",
        quantity : 490.052,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "3262826305",
        materialID : "000000000056481241",
        movementType: 261,
        customerID : "",
        supplierID : "33",
        quantity : 400,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "25877840MZ",
        materialID : "000000000055201980",
        movementType: 261,
        customerID : "",
        supplierID : "34",
        quantity : 27,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "21523564",
        materialID : "000000000055292345",
        movementType: 261,
        customerID : "",
        supplierID : "35",
        quantity : 417,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "2101023705",
        materialID : "000000000055292557",
        movementType: 261,
        customerID : "",
        supplierID : "36",
        quantity : 5,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "2021430854",
        materialID : "000000000055290437",
        movementType: 261,
        customerID : "",
        supplierID : "37",
        quantity : 917,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "12037025",
        materialID : "000000000050283699",
        movementType: 261,
        customerID : "",
        supplierID : "38",
        quantity : 38,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "05163740LS",
        materialID : "000000000010897968",
        movementType: 261,
        customerID : "",
        supplierID : "39",
        quantity : 1550,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "02608956P0",
        materialID : "000000000055482930",
        movementType: 261,
        customerID : "",
        supplierID : "40",
        quantity : 114.948,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "0025499497",
        materialID : "000000000055201980",
        movementType: 261,
        customerID : "",
        supplierID : "42",
        quantity : 70,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "0001100430",
        materialID : "000000000050283699",
        movementType: 261,
        customerID : "",
        supplierID : "43",
        quantity : 20,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "0001022157",
        materialID : "000000000055293670",
        movementType: 261,
        customerID : "",
        supplierID : "44",
        quantity : 60,
        unit : ""
    },
    {
        processOrderID : "000210470204",
        batchID : "0001022157",
        materialID : "000000000055293670",
        movementType: 261,
        customerID : "",
        supplierID : "45",
        quantity : 15,
        unit : ""
    }
]