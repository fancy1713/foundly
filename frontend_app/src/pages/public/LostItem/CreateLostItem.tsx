import { useState } from "react";
import { Form, Button, message, Steps } from "antd";
import {
    Check,
    ChevronDown,
    User,
    PackageSearch,
    FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import PersonalInfoStep from "./Partials/PersonalInfoStep";
import ItemInfoStep from "./Partials/ItemInfoStep";
import AdditionalInfoStep from "./Partials/AdditionalInfoStep";
import FormHeader from "@/components/public/FormHeader";
import { useCreateLostReportMutation } from "@/hooks/mutations/public/useBarangLaporanMutations";

const CreateLostItem = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const createMutation = useCreateLostReportMutation();

    const [currentStep, setCurrentStep] = useState(0);
    const [openPanels, setOpenPanels] = useState<number[]>([0]);

    const stepFields = [
        ["namaPelapor", "nomorTelepon"],
        ["namaBarang", "kategori", "lokasiHilang"],
        ["deskripsiTambahan"],
    ];

    const stepsData = [
        {
            title: "Informasi Pribadi",
            subtitle: "Masukkan Informasi Pribadi sesuai dengan identitas",
            headerIcon: User,
            content: <PersonalInfoStep />,
        },
        {
            title: "Informasi Barang",
            subtitle: "Masukkan Informasi barang sesuai dengan yang hilang",
            headerIcon: PackageSearch,
            content: <ItemInfoStep />,
        },
        {
            title: "Lainnya",
            subtitle: "Deskripsi opsional, tapi dampaknya maksimal. Bantu sistem kami kasih skor kemiripan terbaik buat barangmu!",
            headerIcon: FileText,
            content: <AdditionalInfoStep />,
        },
    ];

    const handleNext = async () => {
        try {
            await form.validateFields(stepFields[currentStep]);

            if (currentStep < stepsData.length - 1) {
                const nextStep = currentStep + 1;
                setCurrentStep(nextStep);
                setOpenPanels([nextStep]);
            } else {
                form.submit();
            }
        } catch (error) {
            message.error("Mohon lengkapi data wajib di bagian ini dengan benar.");
        }
    };

    const togglePanel = (index: number) => {
        if (openPanels.includes(index)) {
            setOpenPanels(openPanels.filter((i) => i !== index));
        } else {
            setOpenPanels([...openPanels, index]);
        }
    };

    const onFinish = (values: any) => {
  console.log("Data Laporan:", values);

  const formData = new FormData();

  formData.append(
    "nama_barang",
    values.namaBarang
  );

  formData.append(
    "kategori",
    values.kategori
  );

  formData.append(
    "lokasi_hilang",
    values.lokasiHilang
  );

  formData.append(
    "deskripsi",
    values.deskripsiTambahan ||
      "Tidak ada deskripsi"
  );

  formData.append(
    "waktu_hilang",
    values.waktuHilang.toISOString()
  );

  formData.append(
    "tgl_hilang",
    values.waktuHilang.toISOString()
  );

  if (
    values.fotoBarang &&
    values.fotoBarang.length > 0
  ) {
    formData.append(
      "foto_barang",
      values.fotoBarang[0].originFileObj
    );
  }

  createMutation.mutate(formData, {
    onSuccess: () => {
      message.success(
        "Laporan kehilangan berhasil dibuat!"
      );

      form.resetFields();

      navigate("/");
    },

    onError: (error: any) => {
      const errMsg =
        error.response?.data?.message ||
        "Terjadi kesalahan";

      message.error(errMsg);
    },
  });
};

    const stepItems = stepsData.map((step, index) => {
        const isActiveStep = currentStep === index;
        const isCompletedStep = currentStep > index;
        const isOpen = openPanels.includes(index);

        return {
            title: null,
            icon: (
                <div
                    className={`mt-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-300 ${isActiveStep ? "border-[#0D9488] bg-[#0D9488]" : "border-[#4b6b68] bg-transparent"
                        }`}
                >
                    {isActiveStep ? (
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    ) : (
                        <div className="h-1 w-1 rounded-full bg-[#0D9488]" />
                    )}
                </div>
            ),
            description: (
                <div
                    className={`mb-6 ml-2 w-full rounded-2xl bg-white p-6 transition-all duration-300 ${isActiveStep ? "border-gray-100 shadow-sm" : "border border-gray-200"
                        }`}
                >
                    <div
                        className="flex cursor-pointer items-start justify-between"
                        onClick={() => togglePanel(index)}
                    >
                        <div className="flex items-start gap-4 pr-4">
                            <div className="mt-0.5 text-gray-500">
                                <step.headerIcon size={22} strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[17px] font-medium text-gray-700">
                                    {step.title}
                                </span>
                                <p className="m-0 text-[13px] leading-relaxed text-gray-400">
                                    {step.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {isCompletedStep && (
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                            )}
                            <ChevronDown
                                className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                    }`}
                                size={20}
                            />
                        </div>
                    </div>

                    <div className={`mt-5 ${isOpen ? "block" : "hidden"}`}>
                        {step.content}
                    </div>
                </div>
            ),
        };
    });

    return (
        <div className="min-h-screen pb-32 font-sans text-gray-800">
            <div className="mx-auto w-full max-w-4xl px-6 py-8">

                <FormHeader title="Form Laporan Kehilangan" />

                <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>

                    <div className="w-full">
                        <Steps
                            orientation="vertical"
                            current={currentStep}
                            items={stepItems}
                            className="w-full [&_.ant-steps-item-description]:w-full [&_.ant-steps-item-description]:pb-2"
                        />
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-6 py-4 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
                        <div className="mx-auto flex w-full max-w-4xl justify-end gap-4 pr-0 md:pr-4">
                            <Button
                                size="large"
                                className="h-11 rounded-lg border-gray-300 px-8 font-medium text-gray-600 hover:border-[#0D9488] hover:text-[#0D9488]"
                                onClick={() => navigate(-1)}
                                loading={createMutation.isPending}
                            >
                                Batal
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleNext}
                                loading={createMutation.isPending}
                                className="h-11 rounded-lg border-none bg-[#0D9488] px-10 font-medium shadow-md hover:bg-teal-700"
                            >
                                {currentStep === stepsData.length - 1 ? "Simpan" : "Selanjutnya"}
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    );
};

export default CreateLostItem;