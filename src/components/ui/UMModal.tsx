import { Modal } from "antd";
import { ReactElement, ReactNode } from "react";

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
  title: string | ReactNode;
  children: ReactElement;
  handleOk?: () => void;
  showCancelButton?: boolean;
  showOkButton?: boolean;
}

const UMModal = ({
  isOpen,
  closeModal,
  title,
  children,
  handleOk,
  showCancelButton = true,
  showOkButton = true,
}: IModal) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={closeModal}
      cancelButtonProps={{
        style: { display: showCancelButton ? "inline" : "none" },
      }}
      okButtonProps={{ style: { display: showOkButton ? "inline" : "none" } }}
    >
      {children}
    </Modal>
  );
};

export default UMModal;
