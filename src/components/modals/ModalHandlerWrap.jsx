import { createContext, useState } from "react";

import Modal from "../../shared/ui/Modal";
import BidsModal from "./BidsModal";

export const ModalContext = createContext();

const ModalHandlerWrap = ({ children }) => {
  const [bidModal, setBidModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        bidModal,
        setBidModal,
      }}
    >
      {children}

      <Modal
        width={550}
        top="calc(20%)"
        isOpen={bidModal}
        handleClose={setBidModal}
      >
        <BidsModal setModal={setBidModal} />
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalHandlerWrap;
