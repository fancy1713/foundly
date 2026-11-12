import { Button } from "antd";
import { FileText } from "lucide-react";
import { useState } from "react";

import DashboardCard from "@/components/common/DashboardCard";
import ClaimReportModal from "@/components/barang-temuan/ClaimReportModal";

const ReportCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const claimData = {
    namaPetugas: "Rohman",
    namaPelapor: "Lucky Fuzy",
    namaBarang: "Earphone Wireless",
    tanggalKlaim: "15-04-2026",
    waktuKlaim: "12:04 WIB",
    image: "/images/petugas.jpg",
  };

  return (
    <>
      <DashboardCard className="flex min-h-[220px] flex-col">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E8F8F6]">
            <FileText
              size={20}
              className="text-[#11998E]"
            />
          </div>

          <h3 className="text-[32px] font-semibold text-[#2F2F2F]">
            Laporkan Barang Temuan
          </h3>
        </div>

        <p className="mt-5 max-w-md leading-7 text-[#6B7280]">
          Catat barang temuan dari pihak kampus maupun
          lingkungan sekitar agar dapat membantu pemilik
          menemukan kembali barang yang hilang.
        </p>

        <div className="mt-auto flex justify-end">
          <Button
            type="primary"
            size="large"
            className="!border-0 !bg-[#11998E]"
            onClick={() => setIsOpen(true)}
          >
            Buat Laporan
          </Button>
        </div>
      </DashboardCard>

      <ClaimReportModal
        open={isOpen}
        claimData={claimData}
        onCancel={() => setIsOpen(false)}
        onSave={() => {
          console.log("saved");
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default ReportCard;