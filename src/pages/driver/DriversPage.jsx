import { useState } from "react";

import ProfileInfoBlock from "../../components/driver/ProfileInfoBlock";
import BidsBlock from "../../components/driver/BidsBlock";
import SideSelector from "../../components/driver/SideSelector";
import HistoryBlock from "../../components/driver/HistoryBlock";

const DriversPage = () => {
  const [state, setState] = useState(false);

  return (
    <div className="w-full h-full max-w-[1024px] mx-auto p-[24px] flex flex-col gap-[24px]">
      <ProfileInfoBlock />

      <SideSelector role={state} setRole={setState} />

      {!state ? <BidsBlock /> : <HistoryBlock />}
    </div>
  );
};

export default DriversPage;
