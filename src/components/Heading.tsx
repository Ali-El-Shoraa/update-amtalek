"use client";

import { memo } from "react";

export default memo(function Heading({
  style,
  children,
  className,
  onClick,
}: any) {
  return (
    <h1
      onClick={onClick}
      className={`text-3xl textHead !mb-4 group relative flex !w-fit flex-col uppercase font-semibold ss:text-lg md:text-md clg:text-lg ${style} ${className}`}
    >
      {children}{" "}
      <span className="absolute -bottom-2 duration-300 ease-in-out transition-all rounded w-1/4 h-1 bg-[#005879] md:h-[2px] group-hover:w-full"></span>
    </h1>
  );
});
