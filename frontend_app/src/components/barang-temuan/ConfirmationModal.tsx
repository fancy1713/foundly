import { Modal } from "antd";
import { memo } from "react";

type ConfirmationModalProps = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const ConfirmationModal = ({ open, onCancel, onOk }: ConfirmationModalProps) => {
  return (
    <Modal
      centered
      okText="OK"
      open={open}
      title={null}
      width={360}
      onCancel={onCancel}
      onOk={onOk}
    >
      <p className="m-0 py-4 text-xs text-[#1f1f1f]">
        Anda yakin telah mengisi data dengan benar?
      </p>
    </Modal>
  );
};

export default memo(ConfirmationModal);
