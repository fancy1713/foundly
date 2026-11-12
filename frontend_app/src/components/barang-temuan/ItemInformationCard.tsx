import { Form, Input, Radio } from "antd";
import { memo } from "react";

import StatusBadge from "@/components/barang-temuan/StatusBadge";
import type { BarangTemuan } from "@/types/barangTemuan";

type ItemInformationCardProps = {
  item: BarangTemuan;
};

const ItemInformationCard = ({ item }: ItemInformationCardProps) => {
  return (
    <section className="overflow-hidden rounded-lg bg-white shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
      <div className="flex items-center justify-between border-b border-[#eeeeee] px-10 py-6">
        <h2 className="m-0 text-2xl font-medium uppercase text-[#4d4d4d]">
          Detail Temuan Barang
        </h2>
        <StatusBadge status={item.status} />
      </div>

      <div className="grid grid-cols-1 gap-12 px-16 py-20 lg:grid-cols-[1fr_480px]">
        <Form
          className="foundly-readonly-form"
          disabled
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item label="Nama Barang">
            <Input value={item.nama_barang} />
          </Form.Item>
          <Form.Item label="Pilih Kategori">
            <Radio.Group value={item.kategori}>
              {kategoriBarangTemuan.map((category) => (
                <Radio key={category} value={category}>
                  {category}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Lokasi ditemukan">
            <Input value={item.lokasi_temuan} />
          </Form.Item>
          <Form.Item label="Perkiraan Tanggal & Waktu ditemukan">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input value={item.tgl_temuan} />
              <Input value={item.waktu_temuan} />
            </div>
          </Form.Item>
          <Form.Item label="Deskripsi Barang">
            <Input.TextArea rows={5} value={item.deskripsi} />
          </Form.Item>
        </Form>

        <img
          alt={item.nama_barang}
          className="h-[480px] w-full rounded-[24px] object-cover"
          src={item.foto_barang}
        />
      </div>
    </section>
  );
};

export default memo(ItemInformationCard);
