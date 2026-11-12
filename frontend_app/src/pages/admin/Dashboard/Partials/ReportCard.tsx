import { Button } from "antd";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReportCard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[240px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F8F6]">
          <FileText
            size={22}
            className="text-[#11998E]"
          />
        </div>

        <h3 className="m-0 text-xl font-bold text-gray-800">
          Laporkan Barang Temuan
        </h3>
      </div>

      <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-gray-500">
        Catat barang temuan dari pihak kampus maupun lingkungan sekitar agar
        dapat membantu pemilik menemukan kembali barang yang hilang.
      </p>

      <div className="mt-auto flex justify-end">
        <Button
          type="primary"
          size="large"
          onClick={() =>
            navigate(
              "/report-found-item/create"
            )
          }
          className="h-11 rounded-xl border-none bg-[#11998E] px-6 font-medium shadow-sm shadow-teal-500/10 hover:bg-teal-700"
        >
          Buat Laporan
        </Button>
      </div>
    </div>
  );
};

export default ReportCard;