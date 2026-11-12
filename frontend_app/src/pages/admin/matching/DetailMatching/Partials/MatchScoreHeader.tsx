import { useProcessVerificationMutation } from "@/hooks/mutations/admin/useVerificationMutations";
import { Card, Button, Progress, message, Input, Modal } from "antd";
import { Check, X, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

type MatchScoreHeaderProps = {
  idVerifikasi: number;
  skor: number;
};

const MatchScoreHeader = ({ idVerifikasi, skor }: MatchScoreHeaderProps) => {
  const navigate = useNavigate();

  const processMutation = useProcessVerificationMutation();

  const handleProcess = (status_verifikasi: boolean, title: string) => {
    let catatan = "";
    
    Modal.confirm({
      title: title,
      content: (
        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-500">Tambahkan catatan untuk pelapor (Opsional):</p>
          <Input.TextArea 
            rows={3} 
            onChange={(e) => catatan = e.target.value} 
            placeholder="Contoh: Barang dapat diambil di pos satpam depan..."
          />
        </div>
      ),
      okText: "Konfirmasi",
      cancelText: "Batal",
      okButtonProps: { 
        danger: !status_verifikasi, 
        className: status_verifikasi ? "bg-[#11998E]!" : "" 
      },
      onOk: async () => {
        try {
          await processMutation.mutateAsync({
            id_pencocokan: idVerifikasi,
            status_verifikasi,
            catatan: catatan || (status_verifikasi ? "Barang telah diamankan oleh petugas." : "Barang tidak sesuai kriteria."),
          });
          
          message.success(`Verifikasi berhasil ${status_verifikasi ? "disetujui" : "ditolak"}!`);
          navigate("/matching");
        } catch (error: any) {
          message.error(error.response?.data?.message || "Gagal memproses verifikasi.");
        }
      }
    });
  };

  return (
    <Card 
      className="w-full rounded-[20px] border border-gray-100 bg-white p-2 shadow-[0px_18px_40px_rgba(112,144,176,0.04)]"
      bordered={false}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4">
        
        <div className="flex items-center gap-5 w-full md:w-auto">
          <Progress
            type="circle"
            percent={skor}
            size={80}
            strokeColor={skor >= 80 ? "#05CD99" : "#FFB547"}
            format={(percent) => (
              <span className="text-xl font-bold text-[#2B3674]">{percent}%</span>
            )}
          />
          <div>
            <span className="text-xs font-semibold text-[#A3AED0] uppercase tracking-wider block">
              Sistem Deteksi Otomatis ({idVerifikasi})
            </span>
            <h2 className="text-2xl font-bold text-[#1B2559] m-0 mt-0.5">
              Tingkat Akurasi Kecocokan Tinggi
            </h2>
            <p className="text-sm text-gray-400 m-0 mt-1 flex items-center gap-1">
              <ShieldAlert size={14} className="text-[#11998E]" />
              Direkomendasikan untuk segera diverifikasi dan serah terima.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Button
            size="large"
            icon={<X size={16} />}
            onClick={() => handleProcess(false, "Tolak Kecocokan Barang?")}
            loading={processMutation.isPending}
            className="h-12 rounded-xl px-5 font-semibold text-gray-500 border-gray-200 hover:text-red-500 hover:border-red-200"
          >
            Tolak Cocok
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<Check size={16} />}
            onClick={() => handleProcess(true, "Konfirmasi Kecocokan Barang?")}
            loading={processMutation.isPending}
            className="h-12 rounded-xl bg-[#11998E] hover:bg-teal-700 border-none px-6 font-semibold shadow-md"
          >
            Konfirmasi Cocok
          </Button>
        </div>

      </div>
    </Card>
  );
};

export default MatchScoreHeader;