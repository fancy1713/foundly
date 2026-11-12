import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import { Camera, CheckCircle2, UserCheck } from "lucide-react";
import { useCreateClaimMutation } from "@/hooks/mutations/admin/useClaimMutations";

export type ClaimReportData = {
  idBarangHilang: number;
  namaPetugas: string;
  namaPelapor: string;
  namaBarang: string;
  tanggalKlaim: string;
  waktuKlaim: string;
  image?: string;
};

type ClaimReportModalProps = {
  open: boolean;
  claimData: ClaimReportData | null;
  onCancel: () => void;
  onSave: () => void;
};

const ClaimReportModal = ({ open, claimData, onCancel, onSave }: ClaimReportModalProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const createClaimMutation = useCreateClaimMutation();

  useEffect(() => {
    if (open && claimData) {
      form.setFieldsValue({
        namaPetugas: claimData.namaPetugas,
        namaPelapor: claimData.namaPelapor,
        namaBarang: claimData.namaBarang,
        tanggalKlaim: claimData.tanggalKlaim,
        waktuKlaim: claimData.waktuKlaim,
      });
      setFileList([]);
    }
  }, [claimData, form, open]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleSave = async () => {
    try {
      await form.validateFields();

      if (fileList.length === 0) {
        message.error("Mohon unggah foto bukti pengambilan (KTM/Wajah) terlebih dahulu!");
        return;
      }

      const formData = new FormData();
      formData.append("id_barang_hilang", String(claimData?.idBarangHilang));
      formData.append("bukti_klaim", fileList[0].originFileObj);

      createClaimMutation.mutate(formData, {
        onSuccess: () => {
          message.success("Klaim berhasil diproses!");
          setFileList([]);
          form.resetFields();
          onSave();
        },
        onError: (error: any) => {
          const errMsg = error.response?.data?.message || "Gagal memproses klaim";
          message.error(errMsg);
        },
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  if (!claimData) return null;

  return (
    <Modal
      centered
      open={open}
      onCancel={onCancel}
      footer={null}
      width={850}
      destroyOnClose
      className="p-0! overflow-hidden! rounded-[20px]!"
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full flex-col items-center justify-center border-r border-gray-100 bg-[#F8FAFC] p-8 md:w-[40%]">
          <div className="mb-4 flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F8F6]">
              <UserCheck size={24} className="text-[#11998E]" />
            </div>
            <h3 className="m-0 text-lg font-bold text-gray-800">Bukti Pengambilan</h3>
            <p className="m-0 mt-1 text-xs text-gray-500">Foto wajah pengambil / KTM</p>
          </div>

          <div className="w-full">
            <Form.Item
              name="fotoBukti"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className="m-0 w-full"
            >
              <Upload.Dragger
                name="file"
                maxCount={1}
                listType="picture-card"
                className="foundly-claim-upload w-full !bg-white hover:!border-[#11998E]"
                fileList={fileList}
                onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                beforeUpload={() => false}
                style={{ width: "100%", height: "220px", padding: "20px" }}
              >
                {fileList.length < 1 && (
                  <div className="flex flex-col items-center justify-center text-gray-400 transition-colors hover:text-[#11998E]">
                    <Camera size={36} strokeWidth={1.5} className="mb-3" />
                    <span className="text-sm font-medium">Unggah Foto</span>
                  </div>
                )}
              </Upload.Dragger>
            </Form.Item>
          </div>
        </div>

        <div className="w-full p-8 md:w-[60%]">
          <div className="mb-6">
            <h3 className="m-0 text-xl font-bold text-gray-800">Verifikasi Laporan Klaim</h3>
            <p className="m-0 mt-1 text-sm text-gray-500">
              Pastikan data identitas pengambil barang sudah sesuai dengan KTM.
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            className="[&_.ant-form-item-label_label]:font-semibold [&_.ant-form-item-label_label]:text-gray-700"
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="Nama Petugas" name="namaPetugas" className="mb-4">
                <Input size="large" readOnly className="rounded-xl bg-gray-50 font-medium text-gray-600" />
              </Form.Item>

              <Form.Item label="Tanggal Klaim" name="tanggalKlaim" className="mb-4">
                <Input size="large" readOnly className="rounded-xl bg-gray-50 font-medium text-gray-600" />
              </Form.Item>
            </div>

            <Form.Item label="Identitas Pengambil (Pelapor)" name="namaPelapor" className="mb-4">
              <Input size="large" readOnly className="rounded-xl bg-gray-50 font-medium text-gray-600" />
            </Form.Item>

            <Form.Item label="Barang yang Diambil" name="namaBarang" className="mb-6">
              <Input size="large" readOnly className="rounded-xl bg-gray-50 font-medium text-gray-600" />
            </Form.Item>

            <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
              <Button size="large" onClick={onCancel} className="rounded-xl font-medium">
                Batal
              </Button>
              <Button
                size="large"
                type="primary"
                loading={createClaimMutation.isPending}
                icon={<CheckCircle2 size={18} />}
                className="flex items-center rounded-xl border-none bg-[#11998E] px-8 font-semibold hover:bg-teal-700"
                onClick={handleSave}
              >
                Konfirmasi Serah Terima
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimReportModal;