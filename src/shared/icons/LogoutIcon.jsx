const LogoutIcon = ({ onClick = () => {} }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className="group cursor-pointer"
      onClick={onClick}
    >
      <g
        fill="none"
        className="stroke-[#2c2c2c] group-hover:stroke-red-600 group-active:stroke-red-700 transition-colors duration-[250ms]"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      >
        <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
        <path d="M9 12h12l-3-3m0 6 3-3" />
      </g>
    </svg>
  );
};

export default LogoutIcon;
