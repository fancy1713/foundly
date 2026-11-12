import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import type { UploadFile } from "antd";
import {
  ArrowRight,
  CalendarClock,
  FileText,
  ImageUp,
  Mail,
  MapPin,
  Package,
  Phone,
  User,
  WalletCards,
} from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateLostReportMutation } from "@/hooks/mutations/public/useBarangLaporanMutations";

import FormProgressRail from "@/components/forms/FormProgressRail";
import ReportFormSection from "@/components/forms/ReportFormSection";

type LostItemFormValues = {
  name: string;
  phoneNumber: string;
  email: string;
  itemName: string;
  category: string;
  lostDate: string;
  lostLocation: string;
  photos?: UploadFile[];
  additionalDescription: string;
};

type StepConfig = {
  title: string;
  fields: Array<keyof LostItemFormValues>;
};

const steps: StepConfig[] = [
  {
    title: "Informasi Pribadi",
    fields: ["name", "phoneNumber", "email"],
  },
  {
    title: "Informasi Barang",
    fields: ["itemName", "category", "lostDate", "lostLocation"],
  },
  {
    title: "Lainnya",
    fields: ["additionalDescription"],
  },
];

const categories = [
  "Elektronik",
  "Dokumen",
  "Pakaian",
  "Aksesori",
  "Perlengkapan Kuliah",
  "Lainnya",
];

const requiredRule = { required: true, message: "Field ini wajib diisi" };

const LostItemStepperForm = () => {
  const [form] = Form.useForm<LostItemFormValues>();
  const [currentStep, setCurrentStep] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const createLostReportMutation = useCreateLostReportMutation();

  const currentFields = useMemo(
    () => steps[currentStep]?.fields ?? [],
    [currentStep]
  );

  const goPrevious = useCallback(() => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }, []);

  const goNext = useCallback(async () => {
    await form.validateFields(currentFields);

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    setIsConfirmOpen(true);
  }, [currentFields, currentStep, form]);

  const handleConfirmSubmit = useCallback(async () => {
    console.log("SUBMIT KEHILANGAN JALAN");
  try {
    const values = await form.validateFields();

    const formData = new FormData();

    formData.append(
      "nama_barang",
      values.itemName
    );

    formData.append(
      "kategori",
      values.category
    );

    formData.append(
      "deskripsi",
      values.additionalDescription
    );

    formData.append(
      "lokasi_hilang",
      values.lostLocation
    );

    formData.append(
      "tgl_hilang",
      values.lostDate
    );

    formData.append(
      "waktu_hilang",
      new Date().toISOString()
    );

    const file =
      values.photos?.[0]?.originFileObj;

    if (file) {
      formData.append(
        "foto_barang",
        file
      );
    }
    
    console.log("MUTATION JALAN");
    await createLostReportMutation.mutateAsync(
      formData
    );

    setIsConfirmOpen(false);

    message.success(
      "Laporan kehilangan berhasil disimpan"
    );

    navigate("/report-history");

  } catch (error) {
    message.error(
      "Gagal menyimpan laporan"
    );
  }
}, [
  form,
  navigate,
  createLostReportMutation,
]);

  return (
    <>
      <div className="relative mx-auto mt-24 w-full max-w-[1040px] pl-0 lg:pl-28">
        <FormProgressRail currentStep={currentStep} totalSteps={steps.length} />
        <Form
          className="foundly-report-form"
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <div className="flex flex-col gap-9">
            <ReportFormSection
              Icon={User}
              completed={currentStep > 0}
              description="Masukkan Informasi Pribadi sesuai dengan identitas"
              title="Informasi Pribadi"
            >
              {currentStep === 0 ? (
                <div className="grid grid-cols-1 gap-x-7 md:grid-cols-3">
                  <Form.Item label="Nama" name="name" rules={[requiredRule]}>
                    <Input prefix={<User size={16} />} placeholder="Nama" />
                  </Form.Item>
                  <Form.Item
                    label="Nomor Telepon"
                    name="phoneNumber"
                    rules={[requiredRule]}
                  >
                    <Input
                      prefix={<Phone size={16} />}
                      placeholder="Nomor Telepon"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      requiredRule,
                      { type: "email", message: "Format email tidak valid" },
                    ]}
                  >
                    <Input prefix={<Mail size={16} />} placeholder="Email" />
                  </Form.Item>
                </div>
              ) : null}
            </ReportFormSection>

            <ReportFormSection
              Icon={WalletCards}
              completed={currentStep > 1}
              description="Masukkan Informasi barang sesuai dengan yang hilang"
              title="Informasi Barang"
            >
              {currentStep === 1 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
                  <Form.Item
                      className="m-0"
                      name="photos"
                      rules={[
                        {
                          required: true,
                          message:
                            "Foto barang wajib diupload",
                        },
                      ]}
                    >
                    <Upload.Dragger
                      accept="image/*"
                      beforeUpload={() => false}
                      className="foundly-upload"
                      listType="picture"
                      maxCount={1}
                    >
                      <ImageUp className="mx-auto text-[#a8a8a8]" size={24} />
                      <p className="m-0 mt-2 text-[11px] text-[#9a9a9a]">
                        <span className="text-[#d92525]">*</span>Maks 5mb, 720p
                      </p>
                    </Upload.Dragger>
                  </Form.Item>

                  <div className="grid grid-cols-1 gap-x-7 md:grid-cols-2">
                    <Form.Item
                      label="Nama Barang"
                      name="itemName"
                      rules={[requiredRule]}
                    >
                      <Input
                        prefix={<Package size={16} />}
                        placeholder="Nama Barang Temuan"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Kategori"
                      name="category"
                      rules={[requiredRule]}
                    >
                      <Select
                        placeholder="Nama Barang Temuan"
                        options={categories.map((category) => ({
                          label: category,
                          value: category,
                        }))}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Tanggal Kehilangan"
                      name="lostDate"
                      rules={[requiredRule]}
                    >
                      <Input
                        prefix={<CalendarClock size={16} />}
                        placeholder="Nama Barang Temuan"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Lokasi Kehilangan"
                      name="lostLocation"
                      rules={[requiredRule]}
                    >
                      <Input
                        prefix={<MapPin size={16} />}
                        placeholder="Nama Barang Temuan"
                      />
                    </Form.Item>
                  </div>
                </div>
              ) : null}
            </ReportFormSection>

            <ReportFormSection
              Icon={FileText}
              collapsible={currentStep !== 2}
              description="Deskripsi opsional, tapi dampaknya maksimal. Bantu sistem kami kasih skor kemiripan terbaik buat barangmu!"
              title="Lainnya"
            >
              {currentStep === 2 ? (
                <Form.Item
                  label="Deskripsi Tambahan (Detail barang)"
                  name="additionalDescription"
                  rules={[requiredRule]}
                >
                  <Input.TextArea
                    autoSize={false}
                    placeholder="Lucky Fauzy"
                    rows={7}
                  />
                </Form.Item>
              ) : null}
            </ReportFormSection>
          </div>
        </Form>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-white px-10 py-6 shadow-[0_-8px_24px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex max-w-[860px] justify-end gap-10">
          <Button className="foundly-secondary-button" onClick={goPrevious}>
            {currentStep === 0 ? "Batal" : "Previous"}
          </Button>
          <Button
            className="foundly-submit-button"
            icon={currentStep === steps.length - 1 ? undefined : <ArrowRight size={16} />}
            type="primary"
            onClick={goNext}
          >
            {currentStep === steps.length - 1 ? "Simpan" : "Next"}
          </Button>
        </div>
      </footer>

      <Modal
        centered
        okText="OK"
        open={isConfirmOpen}
        title={null}
        width={500}
        onCancel={() => setIsConfirmOpen(false)}
        onOk={handleConfirmSubmit}
      >
        <p className="m-0 py-4 text-sm text-[#1f1f1f]">
          Anda yakin telah mengisi data dengan benar?
        </p>
      </Modal>
    </>
  );
};

export default memo(LostItemStepperForm);
