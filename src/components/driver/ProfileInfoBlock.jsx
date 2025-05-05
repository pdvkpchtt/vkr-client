import Wrap from "../../shared/ui/Wrap";
import { useUserStore } from "../../storage/zustand";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { logout } from "../../server_actions/logout";

import LogoutIcon from "../../shared/icons/LogoutIcon";
import MechanicIcon from "../../shared/icons/MechanicIcon";
import DriverIcon from "../../shared/icons/DriverIcon";

dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

const ProfileInfoBlock = () => {
  const { user } = useUserStore();

  return (
    <Wrap>
      {/* name */}
      <div className="flex flex-row gap-[12px] overflow-hidden items-center justify-between">
        <div className="flex flex-row items-center gap-[8px]">
          <p className="text-[24px] truncate text-[#2c2c2c] font-bold">
            {user?.name}
          </p>

          {user?.role === "mecanic" ? <MechanicIcon /> : <DriverIcon />}
        </div>

        <LogoutIcon onClick={async () => await logout()} />
      </div>
      {/* name */}

      {/* bithday */}
      {user?.bithday && (
        <div className="flex flex-col gap-[4px] w-full overflow-hidden">
          <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
            Дата рождения
          </p>
          <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
            {dayjs(user?.bithday).format("DD-MM-YYYY")}
          </p>
        </div>
      )}
      {/* bithday */}

      {/* contacts */}
      <div className="flex flex-col gap-[4px] w-full overflow-hidden">
        <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
          Почта
        </p>
        <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
          {user?.email}
        </p>
      </div>

      <div className="flex flex-col gap-[4px] w-full overflow-hidden">
        <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
          Контактный номер
        </p>
        <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
          {user?.phone}
        </p>
      </div>
      {/* contacts */}

      {/* stag */}
      {user?.stag && (
        <div className="flex flex-col gap-[4px] w-full overflow-hidden">
          <p className="text-[14px] font-medium select-none truncate leading-[14px] text-[#8f8f8f]">
            Стаж
          </p>
          <p className="text-[16px] font-semibold select-none truncate leading-[18px] text-[#2c2c2c]">
            {user?.stag} лет
          </p>
        </div>
      )}
      {/* stag */}
    </Wrap>
  );
};

export default ProfileInfoBlock;
