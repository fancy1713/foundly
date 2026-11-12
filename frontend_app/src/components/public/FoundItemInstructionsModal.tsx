import { Modal } from "antd";
import { memo } from "react";

type FoundItemInstructionsModalProps = {
  open: boolean;
  onClose: () => void;
};

const instructions = [
  "Segera bawa barang temuan Anda ke kantor Sarana Prasarana (Sarpras).",
  "Berikan barang secara langsung kepada petugas jaga di ruangan Sarpras.",
  "Sampaikan informasi barang temuan seperti dimana dan kapan barang tersebut ditemukan agar petugas bisa menginput datanya ke sistem Foundly.",
  "Setelah barang diterima petugas, tanggung jawab penyimpanan dan pencarian pemilik akan sepenuhnya dikelola oleh tim Sarpras.",
];

const FoundItemInstructionsModal = ({
  open,
  onClose,
}: FoundItemInstructionsModalProps) => {
  return (
    <Modal
      centered
      className="foundly-instructions-modal"
      footer={null}
      open={open}
      width={420}
      onCancel={onClose}
    >
      <div className="px-3 py-4">
        <h2 className="mb-6 text-center text-sm font-bold tracking-wide text-[#4a4a4a]">
          PANDUAN MEMBERIKAN BARANG PADA SARPRAS
        </h2>
        <ol className="m-0 pl-6 text-[15px] leading-7 text-[#474747]">
          {instructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ol>
      </div>
    </Modal>
  );
};

export default memo(FoundItemInstructionsModal);
