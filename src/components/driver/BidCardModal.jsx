import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getBidInfoDriver } from "../../server_actions/getBidInfoDriver";

dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};

const BidCardModal = ({
  item = {},
  setClose = () => {},
  selectedId = null,
}) => {
  useEffect(() => {
    if (selectedId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedId]);

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
      const res = await getBidInfoDriver(item?.id);

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
    <>
      <motion.div className="fixed [@media(pointer:coarse)]:hidden top-0 left-0 w-full h-full dark:bg-opacity-[50%] bg-opacity-[20%] z-[100]">
        <motion.div
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          onClick={setClose}
          variants={modalVariant}
          className="fixed [@media(pointer:coarse)]:hidden top-0 left-0 w-full h-full bg-[#4A5479] dark:bg-black dark:bg-opacity-[50%] bg-opacity-[20%] z-[-1]"
        ></motion.div>
        <motion.div
          layoutId={selectedId}
          className="w-[630px] h-fit mx-auto mt-[86px] z-[200] bg-[#F6F6F8] bottom-0 p-[12px] rounded-[20px]"
        >
          <div className="flex flex-col gap-[12px]">
            <div className="w-full flex flex-row gap-[12px] justify-between items-center">
              <p
                className={`text-[16px] leading-[16px] font-medium select-none ${
                  item?.state === "procces" ? "text-red-700" : "text-green-700"
                }`}
              >
                {item?.state === "procces" ? "В процессе" : "Готово"}
              </p>

              <p className="text-[14px] leading-[14px] font-medium select-none text-[#8f8f8f]">
                {dayjs().to(item.date)}
              </p>
            </div>

            <p className="text-[18px] leading-[18px] font-semibold text-[#2c2c2]">
              {item?.description}
            </p>

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
                <div className="flex flex-col gap-[4px] w-full overflow-hidden">
                  <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
                    Механик
                  </p>
                  <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
                    {data?.info_mechanic?.name}
                  </p>
                </div>

                <div className="flex flex-col gap-[4px] w-full overflow-hidden">
                  <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
                    Контактный номер
                  </p>
                  <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
                    {data?.info_mechanic?.phone}
                  </p>
                </div>

                <div className="flex flex-col gap-[4px] w-full overflow-hidden">
                  <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
                    Почта механика
                  </p>
                  <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
                    {data?.info_mechanic?.email}
                  </p>
                </div>

                {data?.info_mechanic?.birthday && (
                  <div className="flex flex-col gap-[4px] w-full overflow-hidden">
                    <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
                      Дата рождения механика
                    </p>
                    <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
                      {dayjs(data?.info_mechanic?.birthday).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BidCardModal;
