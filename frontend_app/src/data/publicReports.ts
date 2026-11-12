export type PublicReportStatus = "PROSES" | "DITEMUKAN" | "SELESAI";

export type PublicReport = {
  id: string;
  itemName: string;
  reporterName: string;
  phoneNumber: string;
  status: PublicReportStatus;
};

export const publicReports: PublicReport[] = [
  {
    id: "report-001",
    itemName: "Sepatu NB",
    reporterName: "Lucky Fauzy",
    phoneNumber: "0815574647",
    status: "PROSES",
  },
  {
    id: "report-002",
    itemName: "Dompet Hitam",
    reporterName: "Nadia Putri",
    phoneNumber: "082190334455",
    status: "DITEMUKAN",
  },
  {
    id: "report-003",
    itemName: "Kartu Mahasiswa",
    reporterName: "Rizky Pratama",
    phoneNumber: "085771208889",
    status: "SELESAI",
  },
];
