import { Modal, Tag, Row, Col, Typography, Card, Descriptions, Image } from "antd";
import { User, Package, CalendarDays, ShieldCheck, Camera, Contact, PackageSearch, UserCheck, Eye } from "lucide-react";
import dayjs from "dayjs";

const { Text } = Typography;

type DetailKlaimModalProps = {
  open: boolean;
  onClose: () => void;
  data: any | null;
};

const DetailKlaimModal = ({ open, onClose, data }: DetailKlaimModalProps) => {
  if (!data) return null;

  return (
    <Modal
      centered
      open={open}
      onCancel={onClose}
      footer={null}
      width={750}
      destroyOnClose
      maskClosable={true}
      className="ant-modal-modern-wrap! animate-in! fade-in! duration-300! [&_.ant-modal-content]:rounded-3xl! [&_.ant-modal-content]:shadow-2xl!"
    >
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 rounded-full border border-teal-100 bg-[#E8F8F6] px-3.5 py-1.5 w-fit">
              <ShieldCheck size={18} className="text-[#11998E]!" />
              <span className="text-[11px] font-bold tracking-wider text-[#11998E] uppercase">
                BERITA ACARA SERAH TERIMA
              </span>
            </div>
            <h1 className="m-0 text-2xl font-bold tracking-tight text-[#1B2559]">
              Tanda Terima Klaim Barang
            </h1>
            <p className="m-0 text-sm text-gray-500 font-medium">
              Referensi Transaksi: <span className="font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">#KLM-{data.id}</span>
            </p>
          </div>
          <div className="shrink-0 text-right">
            <Tag
              color="success"
              className="m-0! flex! items-center! gap-2! rounded-full! border-none! bg-[#E6FFFA]! px-5! py-2.5! text-sm! font-extrabold! text-[#00A896]! shadow-inner!"
            >
              <div className="h-2 w-2 rounded-full bg-[#00A896] animate-pulse"></div>
              SUDAH DIAMBIL
            </Tag>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          <Col span={10}>
            <div className="flex flex-col gap-3">
              <Text className="text-xs! font-bold! uppercase! tracking-wider! text-[#A3AED0]!">
                FOTO BUKTI PENGAMBILAN
              </Text>
              <Card
                className="overflow-hidden! rounded-2xl! border-gray-100! shadow-sm!"
                bodyStyle={{ padding: "8px" }}
              >
                {data.image ? (
                  <Image
                    src={data.image}
                    alt="Bukti Pengambilan"
                    className="h-full! aspect-[3/4]! w-full! rounded-xl! object-cover!"
                    preview={{
                      mask: (
                        <div className="flex flex-col items-center gap-2 text-xs">
                          <Eye size={18} /> Lihat Gambar Penuh
                        </div>
                      )
                    }}
                  />
                ) : (
                  <div className="flex h-full aspect-[3/4] flex-col items-center justify-center gap-3 rounded-xl bg-gray-50 text-gray-400 border border-dashed border-gray-200">
                    <Camera size={40} strokeWidth={1} className="text-gray-300!" />
                    <span className="text-sm font-medium">Tidak ada foto lampiran</span>
                  </div>
                )}
              </Card>
              <div className="mt-1 flex items-center gap-2.5 rounded-xl bg-gray-50/50 p-4 border border-gray-100">
                <CalendarDays size={16} className="text-gray-400!" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Selesai Pada</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {data.tanggal ? dayjs(data.tanggal).format("DD MMMM YYYY") : "-"} • {data.waktu ? dayjs(data.waktu).format("HH:mm") + " WIB" : "-"}
                  </span>
                </div>
              </div>
            </div>
          </Col>

          <Col span={14}>
            <div className="flex flex-col gap-5">

              <div className="flex flex-col gap-3">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#A3AED0]">DETAIL OBJEK</Text>
                <Card className="rounded-xl! border-gray-100! bg-[#FBFCFE]! shadow-sm!" bodyStyle={{ padding: '16px' }}>
                  <Descriptions column={1} size="small" bordered={false} colon={false}
                    className="[&_.ant-descriptions-item-label]:font-medium! [&_.ant-descriptions-item-label]:text-gray-500! [&_.ant-descriptions-item-label]:w-[100px]! [&_.ant-descriptions-item-content]:font-bold! [&_.ant-descriptions-item-content]:text-[#1B2559]!">
                    <Descriptions.Item label={<span><Package size={14} className="inline! mr-2! text-teal-400!" /> Barang</span>}>
                      {data.namaBarang}
                    </Descriptions.Item>
                    <Descriptions.Item label={<span><div className="w-[14px]! h-[14px]! inline! mr-2!"></div>Kategori</span>}>
                      <Tag color="blue" className="rounded-md! border-none! px-2.5! py-0.5! text-xs! font-semibold! m-0!">{data.kategori || "Lainnya"}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </div>

              <div className="flex flex-col gap-3">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#A3AED0]">IDENTITAS PIHAK TERKAIT</Text>
                <Card className="rounded-xl! border-gray-100! bg-[#FBFCFE]1 shadow-sm!" bodyStyle={{ padding: '16px' }}>
                  <Descriptions column={1} size="small" bordered={false} colon={false}
                    className="[&_.ant-descriptions-item-label]:font-medium! [&_.ant-descriptions-item-label]:text-gray-500! [&_.ant-descriptions-item-label]:w-[100px]! [&_.ant-descriptions-item-content]:font-bold! [&_.ant-descriptions-item-content]:text-[#1B2559]!">
                    <Descriptions.Item label={<span className="flex item-center justify-center"><User size={14} className="inline! mr-2! text-blue-400!" /><span>Pengambil</span></span>}>
                      {data.namaPelapor}
                    </Descriptions.Item>
                    {data.kontak && (
                      <Descriptions.Item label={<span><Contact size={14} className="inline! mr-2! text-gray-400!" /> Kontak</span>}>
                        {data.kontak}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label={<span><UserCheck size={14} className="inline! mr-2! text-teal-600!" /> Petugas</span>}>
                      {data.namaPetugas}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </div>

            </div>
          </Col>
        </Row>

        <div className="mt-4 rounded-xl bg-[#FBFCFE] p-5 border border-gray-100 text-center flex flex-col items-center justify-center gap-2">
          <PackageSearch size={32} className="text-[#0D9488]!" strokeWidth={1} />
          <p className="m-0 text-xs font-bold text-gray-700">FOUNDLY • UNIVERSITAS BINA INSANI</p>
          <p className="m-0 text-[10px] text-gray-400 max-w-[400px]">Dokumen ini dihasilkan secara otomatis oleh sistem sebagai bukti sah transaksi serah terima barang temuan. Salinan resmi tersimpan dalam basis data sistem.</p>
        </div>

      </div>
    </Modal>
  );
};

export default DetailKlaimModal;