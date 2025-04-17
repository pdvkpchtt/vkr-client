import { motion } from "framer-motion";

const Button = ({
  text = "empty",
  onClick = () => {},
  loading = false,
  disabled = false,
  style = "",
}) => {
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

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className={`${style} text-[14px] text-[#fff] font-medium leading-[14px] ${
        disabled
          ? "bg-[#e8e8f5]"
          : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
      } transition-colors select-none duration-[250ms] rounded-[8px] p-[12px] w-full text-center`}
    >
      {!loading ? (
        <>{text}</>
      ) : (
        <motion.div
          animate="pulse"
          transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
          className="flex justify-center items-center gap-[12px]"
        >
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-[#fff] will-change-transform"
            variants={dotVariants}
          />
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-[#fff] will-change-transform"
            variants={dotVariants}
          />
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-[#fff] will-change-transform"
            variants={dotVariants}
          />
        </motion.div>
      )}
    </button>
  );
};

export default Button;
