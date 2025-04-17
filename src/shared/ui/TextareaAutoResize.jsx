import { useEffect } from "react";
import autosize from "autosize";

export const TextareaAutoResize = ({
  id = "textarea",
  ref = null,
  label = "",
  placeholder = "",
  value = undefined,
  maxLength,
  onChange = () => {},
  type = "text",
  name = "",
  disabled = false,
  error = null,
  rows = 1,
}) => {
  useEffect(() => {
    autosize(document?.querySelector("#" + id));
  }, []);

  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <p className="text-[12px] font-medium select-none leading-[14px] text-[#8f8f8f]">
          {label}
        </p>
      )}

      <textarea
        ref={ref}
        rows={rows}
        id={id}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        className="bg-[#e8e8f5] placeholder:select-none outline-none text-[14px] rounded-[8px] px-[12px] py-[8px] text-[#2c2c2c]"
        onChange={(e) => onChange(e.target.value)}
        type={type}
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
