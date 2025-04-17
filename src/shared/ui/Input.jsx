import React from "react";

const Input = ({
  ref = null,
  value = "",
  onChange = () => {},
  placeholder = "",
  disabled = false,
  label = "",
  error = "",
  type = "text",
  onEnterPress = () => {},
}) => {
  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <p className="text-[12px] font-medium select-none leading-[14px] text-[#8f8f8f]">
          {label}
        </p>
      )}

      <input
        ref={ref}
        type={type}
        className="bg-[#e8e8f5] placeholder:select-none text-[14px] rounded-[8px] px-[12px] py-[8px] text-[#2c2c2c]"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnterPress();
        }}
      />

      {error && (
        <p
          className={`text-[12px] font-medium select-none leading-[14px] text-[#F2A01B]`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
