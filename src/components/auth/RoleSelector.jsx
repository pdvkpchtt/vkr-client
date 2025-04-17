import { motion } from "framer-motion";

const RoleSelector = ({ role = "driver", setRole = () => {} }) => {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="relative flex w-64 p-1 bg-[#e8e8f5] rounded-full">
        <motion.div
          layoutId="toggle-square" // Ensures smooth transition between positions
          className={`absolute inset-y-0 w-1/2 bg-blue-500 rounded-full shadow-md`}
          style={{
            left: role === "driver" ? "0%" : "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        <button
          onClick={() => setRole("driver")}
          className={`z-10 flex-1 px-4 select-none py-[6px] text-[14px] leading-[14px] font-medium transition-colors duration-200 focus:outline-none ${
            role === "driver" ? "text-white" : "text-[#8f8f8f]"
          }`}
        >
          Водитель
        </button>

        <button
          onClick={() => setRole("mechanic")}
          className={`z-10 flex-1 px-4 select-none py-[6px] text-[14px] leading-[14px] font-medium transition-colors duration-200 focus:outline-none ${
            role === "mechanic" ? "text-white" : "text-[#8f8f8f]"
          }`}
        >
          Механик
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
