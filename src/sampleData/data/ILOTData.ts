import {createSampleILOTs} from "../handler/createSampleILOTs"

export const ILOTMeasurements : Array<{CHARNAME: string, CHARID: string, CHARNR: string,OPNAME : string, OPNR:string}> = [
  {
    "CHARID": "17789",
    "CHARNAME": "Gehalt Chlor",
    "CHARNR": "140",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00010185",
    "CHARNAME": "Aktivgehalt",
    "CHARNR": "0010",
    "OPNR": "0010",
    "OPNAME": "Chromatografie (DELA20MZ)"
  },
  {
    "CHARID": "00017337",
    "CHARNAME": "Transmission bei 600 nm",
    "CHARNR": "0070",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00010366",
    "CHARNAME": "Gehalt Hauptkomponente",
    "CHARNR": "0020",
    "OPNR": "0010",
    "OPNAME": "Chromatografie (DELA20MZ)"
  },
  {
    "CHARID": "00017333",
    "CHARNAME": "Transmission bei 500 nm",
    "CHARNR": "0060",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00017330",
    "CHARNAME": "Transmission bei 460 nm",
    "CHARNR": "0050",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00012773",
    "CHARNAME": "Gehalt Schwefel",
    "CHARNR": "0130",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00012687",
    "CHARNAME": "Gehalt CG 35-1597",
    "CHARNR": "0040",
    "OPNR": "0010",
    "OPNAME": "Chromatografie (DELA20MZ)"
  },
  {
    "CHARID": "00017432",
    "CHARNAME": "unlöslicher Filtrationsrückstand",
    "CHARNR": "0040",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00012884",
    "CHARNAME": "Gehalt Brom",
    "CHARNR": "0150",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00012867",
    "CHARNAME": "Gehalt Calcium",
    "CHARNR": "0100",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00012922",
    "CHARNAME": "Gehalt Zink",
    "CHARNR": "0120",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00010372",
    "CHARNAME": "Gehalt Eisen",
    "CHARNR": "0110",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00012921",
    "CHARNAME": "Gehalt Kalium",
    "CHARNR": "0090",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00010373",
    "CHARNAME": "Gehalt Natrium",
    "CHARNR": "0080",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00012686",
    "CHARNAME": "Gehalt CG 40-0858",
    "CHARNR": "0030",
    "OPNR": "0010",
    "OPNAME": "Chromatografie (DELA20MZ)"
  },
  {
    "CHARID": "EV000021",
    "CHARNAME": "Gehalt Unbekannte (RRT=0.99)",
    "CHARNR": "0060",
    "OPNR": "0010",
    "OPNAME": "Chromatografie (DELA20MZ)"
  },
  {
    "CHARID": "00018467",
    "CHARNAME": "Flüchtige Anteile",
    "CHARNR": "0030",
    "OPNR": "0020",
    "OPNAME": "Nassanalytik (DELA10MZ)"
  },
  {
    "CHARID": "00013449",
    "CHARNAME": "Gehalt Dimethylformamid (DMF)",
    "CHARNR": "0080",
    "OPNR": "0010",
    "OPNAME": "Chromatografie (DELA20MZ)"
  },
  {
    "CHARID": "00016091",
    "CHARNAME": "Summe an anderen Nebenkomponenten",
    "CHARNR": "0070",
    "OPNR": "0010",
    "OPNAME": "Chromatografie (DELA20MZ)"
  },
  {
    "CHARID": "00012688",
    "CHARNAME": "Gehalt CG 36-1043",
    "CHARNR": "0050",
    "OPNR": "0010",
    "OPNAME": "Chromatografie (DELA20MZ)"
  }
]
export const ILOTData = createSampleILOTs()
