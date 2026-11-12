import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Spin, Empty, Tag, Modal, Input, message, Divider } from "antd";
import { ChevronLeft, Stamp, ShieldAlert, User, Clock, AlertTriangle } from "lucide-react";
import dayjs from "dayjs";
import { useGetVerificationHistoryQuery } from "@/hooks/queries/admin/useVerificationQueries";
import { useRollbackVerificationMutation } from "@/hooks/mutations/admin/useVerificationMutations";

// Hooks

const { Text } = Typography;
const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000';

const DetailRiwayatPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const idVerif = Number(id);

  const { data: responseData, isLoading } = useGetVerificationHistoryQuery();
  const rollbackMutation = useRollbackVerificationMutation();

  const record = responseData?.data?.find((item: any) => item.id_verifikasi === idVerif);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Spin size="large" className="text-[#11998E]" />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
        <Empty description="Dokumen Log Verifikasi tidak ditemukan" />
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>
    );
  }

  const isApproved = record.status_verifikasi === true;
  const lostItem = record.pencocokan?.barang_hilang;
  const foundItem = record.pencocokan?.barang_temuan;

  const handleRollback = () => {
    let alasan_batal = "";

    Modal.confirm({
      title: (
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle size={20} />
          <span>Konfirmasi Pembatalan Verifikasi</span>
        </div>
      ),
      icon: null,
      content: (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            Tindakan ini akan menganulir keputusan verifikasi dan mengembalikan status barang ke tahap pencarian (PROSES & DISIMPAN).
          </p>
          <div className="mt-2">
            <label className="mb-1 block text-xs font-semibold text-gray-500">
              ALASAN PEMBATALAN (WAJIB) <span className="text-red-500">*</span>
            </label>
            <Input.TextArea
              rows={3}
              placeholder="Contoh: Ternyata pelapor menolak barang saat serah terima karena beda seri..."
              onChange={(e) => (alasan_batal = e.target.value)}
            />
          </div>
        </div>
      ),
      okText: "Ya, Batalkan Verifikasi",
      cancelText: "Tutup",
      okButtonProps: { 
        danger: true,
        className: "bg-red-500 hover:bg-red-600 border-none shadow-md"
      },
      onOk: async () => {
        if (!alasan_batal.trim()) {
          message.error("Alasan pembatalan tidak boleh kosong!");
          return Promise.reject("Alasan kosong");
        }

        try {
          await rollbackMutation.mutateAsync({
            id_verifikasi: idVerif,
            alasan_batal: alasan_batal,
          });
          message.success("Verifikasi berhasil dibatalkan!");
          navigate("/admin/verifikasi");
        } catch (error: any) {
          message.error(error.response?.data?.message || "Gagal melakukan rollback.");
        }
      },
    });
  };

  return (
    <div className="flex w-full animate-in flex-col gap-6 slide-in-from-bottom-2 fade-in duration-500">
      
      <div className="flex items-center gap-3 mt-1">
        <Button
          type="text"
          icon={<ChevronLeft size={20} className="text-[#1B2559]" />}
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm hover:bg-gray-50"
        />
        <Text className="m-0! text-[26px]! font-bold! leading-none! text-[#1B2559]!">
          Dokumen Log Verifikasi
        </Text>
      </div>

      <div className="relative w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white p-8 shadow-sm">
        <div className="absolute -right-10 -top-10 opacity-5">
          <Stamp size={250} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              ID Log: #V-{record.id_verifikasi} • Ref Pencocokan: #{record.id_pencocokan}
            </span>
            <h2 className="m-0 text-2xl font-bold text-[#1B2559]">
              Hasil Peninjauan Petugas
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} className="text-[#0D9488]" />
                <span className="font-medium">Dieksekusi Oleh:</span> {record.admin?.nama || "Admin"}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-[#0D9488]" />
                <span className="font-medium">Waktu Sistem:</span> {dayjs(record.waktu_verifikasi).format("DD MMMM YYYY, HH:mm:ss")} WIB
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <Tag
              color={isApproved ? "success" : "error"}
              className="m-0! flex! items-center! gap-2! rounded-lg! border-none! px-4! py-2! text-sm! font-bold! shadow-sm! uppercase!"
            >
              {isApproved ? <Stamp size={16} /> : <ShieldAlert size={16} />}
              {isApproved ? "DISETUJUI (COCOK)" : "DITOLAK (TIDAK COCOK)"}
            </Tag>
          </div>
        </div>

        <Divider className="my-6" />

        <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-5 border border-gray-100">
          <span className="text-xs font-bold tracking-wider text-gray-500">CATATAN PETUGAS:</span>
          <p className="m-0 text-sm font-medium text-gray-800 whitespace-pre-line leading-relaxed">
            {record.catatan}
          </p>
        </div>
      </div>

      <h3 className="m-0 mt-4 text-lg font-bold text-[#1B2559]">Objek Tertaut</h3>
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5">
          <Tag color="blue" className="w-fit border-none font-bold">Laporan Hilang #{lostItem?.id_barang_hilang}</Tag>
          <div className="flex gap-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {lostItem?.foto_barang ? (
                <img src={`${BASE_URL}${lostItem.foto_barang}`} alt="hilang" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-400">No Img</div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[#1B2559] text-base">{lostItem?.nama_barang}</span>
              <span className="text-sm text-gray-500">Kategori: {lostItem?.kategori}</span>
              <span className="text-xs text-gray-400 mt-1 line-clamp-2">{lostItem?.lokasi_hilang}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5">
          <Tag color="teal" className="w-fit border-none font-bold bg-[#E8F8F6] text-[#11998E]">Laporan Temuan #{foundItem?.id_temuan}</Tag>
          <div className="flex gap-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {foundItem?.foto_barang ? (
                <img src={`${BASE_URL}${foundItem.foto_barang}`} alt="temuan" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-400">No Img</div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[#1B2559] text-base">{foundItem?.nama_barang}</span>
              <span className="text-sm text-gray-500">Kategori: {foundItem?.kategori}</span>
              <span className="text-xs text-gray-400 mt-1 line-clamp-2">{foundItem?.lokasi_temuan}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian 3: DANGER ZONE (Hanya muncul jika statusnya disetujui dan ingin dibatalkan) */}
      {isApproved && (
        <div className="mt-8 flex flex-col gap-4 rounded-[20px] border border-red-200 bg-red-50/50 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 md:max-w-2xl">
            <h3 className="m-0 flex items-center gap-2 text-lg font-bold text-red-600">
              <AlertTriangle size={20} /> Koreksi Keputusan (Rollback)
            </h3>
            <p className="m-0 text-sm leading-relaxed text-red-500/80">
              Hanya gunakan fitur ini jika terjadi kesalahan manusia (Human Error) atau pelapor menolak barang saat proses serah terima fisik karena tidak sesuai. Tindakan ini akan mengembalikan laporan ke sistem AI untuk dicocokkan ulang.
            </p>
          </div>
          <Button
            type="primary"
            danger
            size="large"
            loading={rollbackMutation.isPending}
            onClick={handleRollback}
            className="h-12 shrink-0 rounded-xl px-6 font-bold shadow-md shadow-red-500/20 md:mt-0"
          >
            Batalkan Keputusan Ini
          </Button>
        </div>
      )}

    </div>
  );
};

export default DetailRiwayatPage;