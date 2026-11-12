import { Button, Form, Input, Modal } from "antd";
import { memo, useEffect } from "react";

export type ClaimReportData = {
  namaPetugas: string;
  namaPelapor: string;
  namaBarang: string;
  tanggalKlaim: string;
  waktuKlaim: string;
  image: string;
};

type ClaimReportModalProps = {
  open: boolean;
  claimData: ClaimReportData;
  onCancel: () => void;
  onSave: () => void;
};

type ClaimReportFormValues = Omit<ClaimReportData, "image">;

const ClaimReportModal = ({
  open,
  claimData,
  onCancel,
  onSave,
}: ClaimReportModalProps) => {
  const [form] = Form.useForm<ClaimReportFormValues>();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        namaPetugas: claimData.namaPetugas,
        namaPelapor: claimData.namaPelapor,
        namaBarang: claimData.namaBarang,
        tanggalKlaim: claimData.tanggalKlaim,
        waktuKlaim: claimData.waktuKlaim,
      });
    }
  }, [claimData, form, open]);

  return (
    <Modal
      centered
      className="foundly-claim-modal"
      footer={null}
      open={open}
      title="LAPORAN KLAIM BARANG"
      width={760}
      onCancel={onCancel}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        <img
          alt={claimData.namaBarang}
          className="h-[280px] w-full rounded-md object-cover"
          src={claimData.image}
        />

        <Form
          className="foundly-claim-form"
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item label="Nama Petugas" name="namaPetugas">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Nama Pelapor" name="namaPelapor">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Nama Barang" name="namaBarang">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Tanggal & Waktu Klaim">
            <div className="grid grid-cols-2 gap-4">
              <Form.Item className="m-0" name="tanggalKlaim">
                <Input readOnly />
              </Form.Item>
              <Form.Item className="m-0" name="waktuKlaim">
                <Input readOnly />
              </Form.Item>
            </div>
          </Form.Item>

          <div className="mt-8 flex justify-end gap-4">
            <Button className="foundly-claim-cancel" onClick={onCancel}>
              Batal
            </Button>
            <Button className="foundly-claim-save" type="primary" onClick={onSave}>
              Simpan
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(ClaimReportModal);
