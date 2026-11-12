import { Form, Input, Select, DatePicker, Upload } from "antd";
import { Camera, ImagePlus } from "lucide-react";
import { useState } from "react";

const { Option } = Select;

const ItemInfoStep = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleChange = (info: any) => {
    const fileList = info.fileList;
    
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj as File;
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pt-2 md:flex-row">
      
      <div className="w-full md:w-1/3">
        <Form.Item
          name="fotoBarang"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Foto barang wajib diunggah" }]}
          className="m-0 h-full"
        >
          <Upload.Dragger
            name="foto_barang"
            beforeUpload={() => false}
            maxCount={1}
            accept="image/png, image/jpeg, image/jpg"
            showUploadList={false}
            onChange={handleChange}
            className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            style={{ padding: previewUrl ? '0' : '2rem 1rem' }} 
          >
            {previewUrl ? (
              <div className="group relative h-full w-full min-h-[200px]">
                <img 
                  src={previewUrl} 
                  alt="Preview Barang" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 font-medium text-white">
                    <ImagePlus size={20} /> Ganti Foto
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-8">
                <p className="ant-upload-drag-icon flex justify-center text-gray-400">
                  <Camera size={32} strokeWidth={1.5} />
                </p>
                <p className="ant-upload-hint mt-2 text-[11px] text-[#E57373]">
                  *Maks 2mb (JPG, JPEG, PNG)
                </p>
              </div>
            )}
          </Upload.Dragger>
        </Form.Item>
      </div>

      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 md:w-2/3 md:grid-cols-2">
        <Form.Item
          name="namaBarang"
          label={<span className="font-medium text-gray-600">Nama Barang</span>}
          rules={[{ required: true, message: "Nama barang wajib diisi" }]}
          className="m-0"
        >
          <Input size="large" placeholder="Nama Barang Temuan" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          name="kategori"
          label={<span className="font-medium text-gray-600">Kategori</span>}
          rules={[{ required: true, message: "Kategori wajib dipilih" }]}
          className="m-0"
        >
          <Select size="large" placeholder="Pilih Kategori" className="rounded-lg">
            <Option value="elektronik">Elektronik</Option>
            <Option value="dokumen">Dokumen</Option>
            <Option value="pakaian">Pakaian</Option>
            <Option value="aksesoris">Aksesoris</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="waktuTemuan"
          label={<span className="font-medium text-gray-600">Perkiraan Tanggal & Waktu</span>}
          rules={[{ required: true, message: "Waktu temuan wajib diisi" }]}
          className="m-0"
        >
          <DatePicker showTime size="large" className="w-full rounded-lg" placeholder="Pilih tanggal & waktu" />
        </Form.Item>

        <Form.Item
          name="lokasiTemuan"
          label={<span className="font-medium text-gray-600">Perkiraan Lokasi Penemuan</span>}
          rules={[{ required: true, message: "Lokasi penemuan wajib diisi" }]}
          className="m-0"
        >
          <Input size="large" placeholder="Sekitar gedung SC..." className="rounded-lg" />
        </Form.Item>
      </div>
      
    </div>
  );
};

export default ItemInfoStep;