import { useState } from "react";
import { Modal, Form, Input, Button, Tabs, message, InputNumber } from "antd";
import { User, Lock, Fingerprint, PhoneCall } from "lucide-react";
import { useLoginMutation, useRegisterMutation } from "@/hooks/mutations/useAuthMutation";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState("login");

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleLogin = async (values: any) => {
    try {
      loginMutation.mutate({...values}, {
        onSuccess: (response) => {
          if (response.status && response.data) {
            login(response.data.token, response.data.user);
            message.success(response.message || "Selamat datang kembali!");

            const origin = location.state?.from?.pathname;
            
            if (response.data.user.role === "ADMIN") {
              navigate(origin || "/admin/dashboard");
            } else {
              navigate(origin || "/");
            }

            if (onSuccess) onSuccess();
            onClose();

            loginForm.resetFields();
          } else {
            message.error(response.message || "Gagal masuk, periksa kembali data Anda.");
          }
        },
        onError: (error: any) => {
          const errorMsg = error.response?.data?.message || "Terjadi kesalahan jaringan.";
          message.error(errorMsg);
        },
      });
    } catch (error) {
      console.log("Error:", error)
      message.error("Pendaftaran gagal.");

    }
  };

  const handleRegister = async (values: any) => {
    try {
      registerMutation.mutate({...values, role: 'PUBLIC'}, {
        onSuccess: (response) => {
          if (response.status) {
            message.success("Registrasi berhasil! Silakan masuk menggunakan akun Anda.");
            setActiveTab("login");
            registerForm.resetFields();
          } else {
            message.error(response.message || "Gagal melakukan registrasi.");
          }
        },
        onError: (error: any) => {
          const errorMsg = error.response?.data?.message || "Gagal mendaftar.";
          message.error(errorMsg);
        },
      });
    } catch (error) {
      console.log("Error:", error)
      message.error("Pendaftaran gagal.");
    }
  };

  const isLoading = !loginMutation.isPending || !registerMutation.isPending

  const tabItems = [
    {
      key: "login",
      label: <span className="px-4 text-base font-medium">Masuk</span>,
      children: (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="mb-6 mt-2 text-center">
            <h3 className="text-xl font-bold text-gray-800">Selamat Datang Kembali</h3>
            <p className="mt-1 text-sm text-gray-500">
              Gunakan akun portal Eureka UNIBI Anda untuk masuk.
            </p>
          </div>

          <Form form={loginForm} layout="vertical" onFinish={handleLogin} requiredMark={false}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email Wajib diisi" }]}
            >
              <Input
                size="large"
                prefix={<Fingerprint size={18} className="mr-2 text-gray-400" />}
                placeholder="Email"
                className="h-12 rounded-xl text-[15px]"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Kata sandi wajib diisi" }]}
              className="mb-8"
            >
              <Input.Password
                size="large"
                prefix={<Lock size={18} className="mr-2 text-gray-400" />}
                placeholder="Kata Sandi"
                className="h-12 rounded-xl text-[15px]"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loginMutation.isPending}
              className="h-12 w-full rounded-xl bg-[#0D9488] text-[15px] font-semibold shadow-md shadow-teal-500/20 hover:bg-teal-700"
            >
              Masuk Sekarang
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: "register",
      label: <span className="px-4 text-base font-medium">Daftar Akun</span>,
      children: (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="mb-6 mt-2 text-center">
            <h3 className="text-xl font-bold text-gray-800">Buat Akun Foundly</h3>
            <p className="mt-1 text-sm text-gray-500">
              Daftarkan identitas Anda untuk mulai melaporkan barang.
            </p>
          </div>

          <Form form={registerForm} layout="vertical" onFinish={handleRegister} requiredMark={false}>
            <Form.Item
              name="nama"
              rules={[{ required: true, message: "Nama lengkap wajib diisi" }]}
              className="mb-4"
            >
              <Input
                size="large"
                prefix={<User size={18} className="mr-2 text-gray-400" />}
                placeholder="Nama Lengkap"
                className="h-12 rounded-xl text-[15px]"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email wajib diisi" }]}
              className="mb-4"
            >
              <Input
                size="large"
                prefix={<Fingerprint size={18} className="mr-2 text-gray-400" />}
                placeholder="Email Mahasiswa"
                className="h-12 rounded-xl text-[15px]"
              />
            </Form.Item>

            <Form.Item
              name="kontak"
              rules={[{ required: true, message: "Nama lengkap wajib diisi" }]}
              className="mb-4"
            >
              <InputNumber
                size="large"
                prefix={<PhoneCall size={18} className="mr-2 text-gray-400" />}
                placeholder="No Handphone"
                className="h-12! rounded-xl! text-[15px]! w-full!"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Kata sandi wajib dibuat" }]}
              className="mb-8"
            >
              <Input.Password
                size="large"
                prefix={<Lock size={18} className="mr-2 text-gray-400" />}
                placeholder="Buat Kata Sandi"
                className="h-12 rounded-xl text-[15px]"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={registerMutation.isPending}
              className="h-12! w-full! rounded-xl! bg-gray-800! text-[15px]! font-semibold! text-white! shadow-md! hover:bg-gray-700!"
            >
              Daftar Sekarang
            </Button>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      mask={{ closable: !isLoading }}
      closable={!isLoading}
      className="foundly-auth-modal p-0!"
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={tabItems}
        className="[&_.ant-tabs-nav]:mb-2"
      />
    </Modal>
  );
};

export default AuthModal;