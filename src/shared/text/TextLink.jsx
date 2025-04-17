import { NavLink } from "react-router-dom";

const TextLink = ({ to = "/", text = "empty" }) => {
  return (
    <NavLink
      to={to}
      className={
        "text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer transition-colors select-none duration-[250ms] font-medium text-[16px] leading-[16px]"
      }
    >
      {text}
    </NavLink>
  );
};

export default TextLink;
