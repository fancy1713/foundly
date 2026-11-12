import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Upload,
  message,
} from "antd";
import type { RuleObject } from "antd/es/form";
import type { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { Upload as UploadIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ClaimReportModal from "@/components/barang-temuan/ClaimReportModal";
import type { ClaimReportData } from "@/components/barang-temuan/ClaimReportModal";
import ConfirmationModal from "@/components/barang-temuan/ConfirmationModal";
import { kategoriBarangTemuan } from "@/data/barangTemuan";
import DashboardLayout from "@/layout/DashboardLayout";

type CreateBarangTemuanFormValues = {
  namaBarang: string;
  kategori: string;
  lokasi: string;
  tanggal: string;
  waktu: string;
  deskripsi: string;
  foto: UploadFile[];
};

const requiredRule = { required: true, message: "Field ini wajib diisi" };

const fotoValidator = (_: RuleObject, value?: UploadFile[]) => {
  if (value && value.length > 0) {
    return Promise.resolve();
  }

  return Promise.reject(new Error("Foto wajib diunggah"));
};

const getUploadValue = (event: UploadChangeParam<UploadFile>) =>
  event.fileList.slice(-1);

const CreateBarangTemuanPage = () => {
  const [form] = Form.useForm<CreateBarangTemuanFormValues>();
  const [previewUrl, setPreviewUrl] = useState("");
  const [claimData, setClaimData] = useState<ClaimReportData | null>(null);
  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  const uploadFileList = Form.useWatch("foto", form) ?? [];

  const fallbackClaimData = useMemo<ClaimReportData>(
    () => ({
      namaPetugas: "Rahman",
      namaPelapor: "Lucky Fauzy",
      namaBarang: "Earphone Wireless",
      tanggalKlaim: "15-04-2026",
      waktuKlaim: "12:04 WIB",
      image: "/images/barang-temuan/earphone.svg",
    }),
    []
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const beforeUpload = useCallback<NonNullable<UploadProps["beforeUpload"]>>(
    (file) => {
      const isUnderLimit = file.size / 1024 / 1024 <= 5;

      if (!isUnderLimit) {
        message.error("Ukuran foto maksimal 5MB");
        return Upload.LIST_IGNORE;
      }

      return false;
    },
    []
  );

  const handleUploadChange = useCallback(
    (event: UploadChangeParam<UploadFile>) => {
      const nextFile = event.fileList.at(-1);
      const originFile = nextFile?.originFileObj;

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (originFile instanceof File) {
        setPreviewUrl(URL.createObjectURL(originFile));
        return;
      }

      setPreviewUrl("");
    },
    [previewUrl]
  );

  const handleSubmit = useCallback(async () => {
    const values = await form.validateFields();

    setClaimData({
      namaPetugas: "Rahman",
      namaPelapor: "Lucky Fauzy",
      namaBarang: values.namaBarang,
      tanggalKlaim: values.tanggal,
      waktuKlaim: values.waktu,
      image: previewUrl || fallbackClaimData.image,
    });
    setIsClaimOpen(true);
  }, [fallbackClaimData.image, form, previewUrl]);

  const handleSaveClaim = useCallback(() => {
    setIsClaimOpen(false);
    setIsConfirmationOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    setIsConfirmationOpen(false);
    message.success("Laporan barang temuan berhasil disimpan");
    navigate("/barang-temuan");
  }, [navigate]);

  return (
    <DashboardLayout>
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-[1100px]">
          <Breadcrumb
            className="foundly-admin-breadcrumb mb-6"
            items={[
              {
                title: <Link to="/barang-temuan">Barang Temuan</Link>,
              },
              {
                title: "Buat Laporan Temuan",
              },
            ]}
          />

          <Form
            className="foundly-create-form overflow-hidden rounded-lg bg-white"
            form={form}
            layout="vertical"
            requiredMark={false}
          >
            <div className="p-6">
              <h2 className="m-0 mb-10 text-2xl font-medium uppercase text-[#4d4d4d]">
                Information Item
              </h2>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
                <div>
                  <Form.Item
                    label="Nama Barang"
                    name="namaBarang"
                    rules={[requiredRule]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Pilih Kategori"
                    name="kategori"
                    rules={[requiredRule]}
                  >
                    <Radio.Group>
                      {kategoriBarangTemuan.map((category) => (
                        <Radio key={category} value={category}>
                          {category}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Lokasi Ditemukan"
                    name="lokasi"
                    rules={[requiredRule]}
                  >
                    <Input />
                  </Form.Item>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Form.Item
                      label="Perkiraan Tanggal Ditemukan"
                      name="tanggal"
                      rules={[requiredRule]}
                    >
                      <Input placeholder="Contoh: 11-04-2026" />
                    </Form.Item>

                    <Form.Item label="Waktu" name="waktu" rules={[requiredRule]}>
                      <Input placeholder="Contoh: 12:04 WIB" />
                    </Form.Item>
                  </div>

                  <Form.Item
                    label="Deskripsi Tambahan"
                    name="deskripsi"
                    rules={[requiredRule]}
                  >
                    <Input.TextArea rows={6} />
                  </Form.Item>
                </div>

                <Form.Item
                  className="m-0"
                  name="foto"
                  rules={[{ validator: fotoValidator }]}
                  valuePropName="fileList"
                  getValueFromEvent={getUploadValue}
                >
                  <Upload.Dragger
                    accept="image/*"
                    beforeUpload={beforeUpload}
                    className="foundly-create-upload"
                    fileList={uploadFileList}
                    listType="picture"
                    maxCount={1}
                    onChange={handleUploadChange}
                  >
                    {previewUrl ? (
                      <img
                        alt="Preview foto barang temuan"
                        className="h-full w-full rounded-lg object-cover"
                        src={previewUrl}
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center text-[#b6b6b6]">
                        <UploadIcon size={48} strokeWidth={1.8} />
                        <p className="m-0 mt-5 text-lg leading-6">
                          Upload Foto 720p
                          <br />
                          Maks 5mb
                        </p>
                      </div>
                    )}
                  </Upload.Dragger>
                </Form.Item>
              </div>
            </div>

            <Divider className="m-0" />

            <div className="flex justify-end gap-6 px-6 py-4">
              <Button
                className="foundly-admin-secondary"
                onClick={() => navigate("/barang-temuan")}
              >
                Batal
              </Button>
              <Button
                className="foundly-admin-save"
                type="primary"
                onClick={handleSubmit}
              >
                Simpan
              </Button>
            </div>
          </Form>
        </div>

        <ClaimReportModal
          claimData={claimData ?? fallbackClaimData}
          open={isClaimOpen}
          onCancel={() => setIsClaimOpen(false)}
          onSave={handleSaveClaim}
        />
        <ConfirmationModal
          open={isConfirmationOpen}
          onCancel={() => setIsConfirmationOpen(false)}
          onOk={handleConfirm}
        />
      </section>
    </DashboardLayout>
  );
};

export default CreateBarangTemuanPage;
