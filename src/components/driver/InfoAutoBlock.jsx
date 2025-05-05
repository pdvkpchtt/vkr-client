import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getDriverAuto } from "../../server_actions/getDriverAuto";
import Wrap from "../../shared/ui/Wrap";
import CarIcon from "../../shared/icons/CarIcon";

const InfoAutoBlock = () => {
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
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    startTransition(async () => {
      const res = await getDriverAuto();

      console.log(res);

      if (res?.error) {
        toast.error(res?.error);
        return;
      }

      setData(res);
    });
  };

  useEffect(() => {
    (async () => {
      await handleFetch();
    })();
  }, []);

  return (
    <Wrap>
      {isPending ? (
        <motion.div
          animate="pulse"
          transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
          className="flex justify-center items-center gap-[12px]"
        >
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-[#3b82f7] will-change-transform"
            variants={dotVariants}
          />
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-[#3b82f7] will-change-transform"
            variants={dotVariants}
          />
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-[#3b82f7] will-change-transform"
            variants={dotVariants}
          />
        </motion.div>
      ) : (
        <>
          {/* name */}
          <div className="flex flex-row gap-[12px] overflow-hidden items-center justify-between">
            <div className="flex flex-row items-center gap-[8px]">
              <p className="text-[24px] truncate text-[#2c2c2c] font-bold">
                {data?.mark} {data?.model}
              </p>

              <CarIcon />
            </div>
          </div>
          {/* name */}

          {/* gos nomer */}
          <div className="flex flex-col gap-[4px] w-full overflow-hidden">
            <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
              Гос номер
            </p>
            <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
              {data?.gos_nomer}
            </p>
          </div>
          {/* gos nomer */}

          {/* vin */}
          <div className="flex flex-col gap-[4px] w-full overflow-hidden">
            <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
              VIN номер
            </p>
            <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
              {data?.vin}
            </p>
          </div>
          {/* vin */}

          {/* eyar */}
          <div className="flex flex-col gap-[4px] w-full overflow-hidden">
            <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
              Год выпуска
            </p>
            <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
              {data?.year}
            </p>
          </div>
          {/* eyar */}

          {/* gruzopod */}
          <div className="flex flex-col gap-[4px] w-full overflow-hidden">
            <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
              Грузоподъемность
            </p>
            <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
              {data?.gruzopod} кг.
            </p>
          </div>
          {/* gruzopod */}

          {/* power */}
          <div className="flex flex-col gap-[4px] w-full overflow-hidden">
            <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
              Мощность
            </p>
            <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
              {data?.power} л.с.
            </p>
          </div>
          {/* power */}

          {/* rasxod */}
          <div className="flex flex-col gap-[4px] w-full overflow-hidden">
            <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
              Расход
            </p>
            <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
              {data?.rasxod} л. на 100 км.
            </p>
          </div>
          {/* rasxod */}

          {/* объем двигателя */}
          <div className="flex flex-col gap-[4px] w-full overflow-hidden">
            <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
              Объем двигателя
            </p>
            <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
              {data?.v_dvig} л.
            </p>
          </div>
          {/* объем двигателя */}

          {/* korobka */}
          <div className="flex flex-col gap-[4px] w-full overflow-hidden">
            <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
              Коробка передач
            </p>
            <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
              {data?.type_kpp}
            </p>
          </div>
          {/* korobka */}
        </>
      )}
    </Wrap>
  );
};

export default InfoAutoBlock;
