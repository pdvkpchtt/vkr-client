import { useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Wrap from "../../shared/ui/Wrap";
import Button from "../../shared/ui/Button";

import { ModalContext } from "../modals/ModalHandlerWrap";

dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

const BidCard = ({ item = {}, setHistoryModal = () => {} }) => {
  return (
    <Wrap>
      <div className="w-full flex flex-row gap-[12px] justify-between items-center">
        <p
          className={`text-[16px] leading-[16px] font-medium select-none ${
            item?.state === "procces" ? "text-red-700" : "text-green-700"
          }`}
        >
          {item?.state === "procces" ? "В процессе" : "Готово"}
        </p>

        {/* <p className="text-[14px] leading-[14px] font-medium select-none text-[#8f8f8f]">
          {dayjs().to(item.date)}
        </p> */}
      </div>

      <p className="text-[18px] leading-[18px] font-semibold text-[#2c2c2]">
        {item?.description}
      </p>

      <Button text="Готово" onClick={() => setHistoryModal(item?.id)} />
    </Wrap>
  );
};

export default BidCard;
