import Wrap from "../../shared/ui/Wrap";
import { useUserStore } from "../../storage/zustand";

import LogoutIcon from "../../shared/icons/LogoutIcon";

import { logout } from "../../server_actions/logout";

const ProfileInfoBlock = () => {
  const { user } = useUserStore();
  return (
    <Wrap>
      {/* name */}
      <div className="flex flex-row gap-[12px] overflow-hidden items-center justify-between">
        <p className="text-[24px] truncate text-[#2c2c2c] font-bold">
          {user?.name}
        </p>

        <LogoutIcon onClick={async () => await logout()} />
      </div>
      {/* name */}

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
    </Wrap>
  );
};

export default ProfileInfoBlock;
