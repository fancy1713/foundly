import { Form, Input } from "antd";

const PersonalInfoStep = () => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 pt-2 md:grid-cols-2">
      <Form.Item
        name="namaPenemu"
        label={
          <span className="font-medium text-gray-600">
            Nama Lengkap <span className="text-gray-400 font-normal">(Opsional)</span>
          </span>
        }
      >
        <Input size="large" placeholder="Nama sesuai identitas" className="rounded-lg" />
      </Form.Item>

      <Form.Item
        name="nomorTelepon"
        label={
          <span className="font-medium text-gray-600">
            Nomor Telepon / WA <span className="text-gray-400 font-normal">(Opsional)</span>
          </span>
        }
      >
        <Input size="large" placeholder="Contoh: 0815574647" className="rounded-lg" />
      </Form.Item>
    </div>
  );
};

export default PersonalInfoStep;