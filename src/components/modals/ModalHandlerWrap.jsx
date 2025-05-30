import { createContext, useState } from "react";

import Modal from "../../shared/ui/Modal";
import BidsModal from "./BidsModal";
import SetHistoryModal from "./SetHistoryModal";

export const ModalContext = createContext();

const ModalHandlerWrap = ({ children }) => {
  const [bidModal, setBidModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        bidModal,
        setBidModal,
        historyModal,
        setHistoryModal,
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

      <Modal
        width={550}
        top="calc(20%)"
        isOpen={historyModal}
        handleClose={setHistoryModal}
      >
        <SetHistoryModal setModal={setHistoryModal} bidId={historyModal} />
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalHandlerWrap;
