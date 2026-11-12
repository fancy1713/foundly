import { Form, Input } from "antd";

const { TextArea } = Input;

const AdditionalInfoStep = () => {
  return (
    <div className="pt-2">
      <Form.Item
        name="deskripsiTambahan"
        label={
          <span className="font-medium text-gray-700">
            Deskripsi Tambahan (Detail barang)
          </span>
        }
      >
        <TextArea
          rows={5}
          placeholder="Tuliskan ciri fisik, warna, atau detail spesifik lainnya..."
          className="rounded-lg border-gray-200"
        />
      </Form.Item>
    </div>
  );
};

export default AdditionalInfoStep;