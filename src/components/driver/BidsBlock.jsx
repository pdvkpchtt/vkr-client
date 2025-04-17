import { motion } from "framer-motion";
import { useContext, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

import { getDriverBids } from "../../server_actions/getDriverBids";

import Wrap from "../../shared/ui/Wrap";
import Button from "../../shared/ui/Button";
import BidCard from "./BidCard";
import { ModalContext } from "../modals/ModalHandlerWrap";

const BidsBlock = () => {
  const { bidModal, setBidModal } = useContext(ModalContext);

  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const [isPending, startTransition] = useTransition();
  const [bids, setBids] = useState(null);

  const handleFetch = async () => {
    startTransition(async () => {
      const res = await getDriverBids();

      if (res?.error) {
        toast.error(res?.error);
        return;
      }

      setBids(res);
    });
  };

  useEffect(() => {
    if (!bidModal)
      (async () => {
        await handleFetch();
      })();
  }, [bidModal]);

  return (
    <>
      {!bids || isPending ? (
        <div className="flex w-full h-fit items-center justify-center p-[24px]">
          <motion.div
            animate="pulse"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="flex justify-center items-center gap-[12px]"
          >
            <motion.div
              className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-blue-500 will-change-transform"
              variants={dotVariants}
            />
            <motion.div
              className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-blue-500 will-change-transform"
              variants={dotVariants}
            />
            <motion.div
              className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-blue-500 will-change-transform"
              variants={dotVariants}
            />
          </motion.div>
        </div>
      ) : bids?.length === 0 ? (
        <Wrap>
          <p className="text-[16px] font-medium text-center select-none truncate leading-[18px] text-[#2c2c2c]">
            У вас нет активных заявок
          </p>

          <Button
            text="Создать"
            style="max-w-[300px] w-full mx-auto"
            onClick={() => setBidModal(true)}
          />
        </Wrap>
      ) : (
        <>
          <Button
            text="Создать заявку"
            style="max-w-[300px] w-full mx-auto"
            onClick={() => setBidModal(true)}
          />

          {bids.map((i) => (
            <BidCard key={i?.id} item={i} />
          ))}
        </>
      )}
    </>
  );
};

export default BidsBlock;
