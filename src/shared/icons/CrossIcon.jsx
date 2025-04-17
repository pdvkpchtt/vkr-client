const CrossIcon = ({ onClick = () => {} }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 15 15"
      className="cursor-pointer group"
      onClick={onClick}
    >
      <path
        className="fill-[#2c2c2c] group-hover:fill-red-600 group-active:fill-red-700 transition-colors duration-[250ms]"
        fillRule="evenodd"
        d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default CrossIcon;
