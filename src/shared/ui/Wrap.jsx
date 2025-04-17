const Wrap = ({
  children,
  style = "",
  flexStyle = "flex flex-col gap-[12px]",
}) => {
  return (
    <div
      className={`rounded-[20px] p-[12px] bg-[#fff] w-full ${style} ${flexStyle}`}
    >
      {children}
    </div>
  );
};

export default Wrap;
