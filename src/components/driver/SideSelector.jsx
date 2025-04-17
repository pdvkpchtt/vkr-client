import { motion } from "framer-motion";
import Wrap from "../../shared/ui/Wrap";

const SideSelector = ({ role = false, setRole = () => {} }) => {
  return (
    <Wrap style="w-fit mx-auto">
      <div className="relative flex items-center justify-center w-full">
        <div className="relative flex w-64 p-1 bg-[#e8e8f5] rounded-[8px]">
          <motion.div
            layoutId="toggle-square" // Ensures smooth transition between positions
            className={`absolute inset-y-0 w-1/2 bg-blue-500 rounded-[8px] shadow-md`}
            style={{
              left: role === false ? "0%" : "50%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />

          <button
            onClick={() => setRole(false)}
            className={`z-10 flex-1 px-4 select-none py-[6px] text-[14px] leading-[14px] font-medium transition-colors duration-200 focus:outline-none ${
              role === false ? "text-white" : "text-[#8f8f8f]"
            }`}
          >
            Заявки
          </button>

          <button
            onClick={() => setRole(true)}
            className={`z-10 flex-1 px-4 select-none py-[6px] text-[14px] leading-[14px] font-medium transition-colors duration-200 focus:outline-none ${
              role === true ? "text-white" : "text-[#8f8f8f]"
            }`}
          >
            История
          </button>
        </div>
      </div>
    </Wrap>
  );
};

export default SideSelector;
