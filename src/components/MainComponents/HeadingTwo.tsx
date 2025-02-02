"use client";
function HeadingTwo({ style, children }: any) {
  return <h2 className={`text-2xl font-medium asm:text- ${style}`}>{children}</h2>;
}

export default HeadingTwo;
