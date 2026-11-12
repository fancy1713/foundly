import { Form, Input, Radio } from "antd";
import { memo } from "react";

import StatusBadge from "@/components/barang-laporan/StatusBadge";
import { kategoriBarangLaporan } from "@/data/barangLaporan";
import type { BarangLaporan } from "@/types/barangLaporan";

type DetailBarangLaporanCardProps = {
  report: BarangLaporan;
};

const DetailBarangLaporanCard = ({ report }: DetailBarangLaporanCardProps) => {
  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <div className="flex items-center justify-between border-b border-[#eeeeee] px-10 py-6">
        <h2 className="m-0 text-lg font-medium uppercase text-[#4d4d4d]">
          Detail Barang Laporan
        </h2>
        <StatusBadge status={report.status} />
      </div>

      <div className="grid grid-cols-1 gap-10 px-16 py-16 lg:grid-cols-[1fr_420px]">
        <Form
          className="foundly-readonly-form"
          disabled
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item label="Nama Barang">
            <Input value={report.nama_barang} />
          </Form.Item>
          <Form.Item label="Lokasi Kehilangan">
            <Input value={report.lokasi_hilang} />
          </Form.Item>
          <Form.Item label="Pilih Kategori">
            <Radio.Group value={report.kategori}>
              {kategoriBarangLaporan.map((category) => (
                <Radio key={category} value={category}>
                  {category}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Perkiraan Tanggal & Waktu Kehilangan">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input value={report.tgl_hilang} />
              <Input value={report.waktu_hilang} />
            </div>
          </Form.Item>
          <Form.Item label="Deskripsi Barang">
            <Input.TextArea rows={5} value={report.deskripsi} />
          </Form.Item>
        </Form>

        <img
          alt={report.nama_barang}
          className="h-[420px] w-full rounded-[14px] object-cover"
          src={report.foto_barang}
        />
      </div>
    </section>
  );
};

export default memo(DetailBarangLaporanCard);
