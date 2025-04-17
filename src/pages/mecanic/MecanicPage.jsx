import ProfileInfoBlock from "../../components/driver/ProfileInfoBlock";
import BidsBlock from "../../components/mecanic/BidsBlock";

const MecanicPage = () => {
  return (
    <div className="w-full h-full max-w-[1024px] mx-auto p-[24px] flex flex-col gap-[24px]">
      <ProfileInfoBlock />

      <BidsBlock />
    </div>
  );
};

export default MecanicPage;
