import { LayoutGroup, motion } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

import Wrap from "../../shared/ui/Wrap";
import BidCard from "./BidCard";
import { getDriverHistory } from "../../server_actions/getDriverHistory";

const HistoryBlock = () => {
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
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState(null);

  const handleFetch = async () => {
    startTransition(async () => {
      const res = await getDriverHistory();
      console.log(res);

      if (res?.error) {
        toast.error(res?.error);
        return;
      }

      setHistory(res);
    });
  };

  useEffect(() => {
    (async () => {
      await handleFetch();
    })();
  }, []);

  return (
    <div className="flex flex-col gap-[12px]">
      {!history || isPending ? (
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
      ) : history?.length === 0 || history?.detail ? (
        <Wrap>
          <p className="text-[16px] font-medium text-center select-none truncate leading-[18px] text-[#2c2c2c]">
            У вас нет истории
          </p>
        </Wrap>
      ) : (
        <>
          {history.map((i) => (
            <BidCard
              no
              key={i?.id}
              item={i}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default HistoryBlock;
