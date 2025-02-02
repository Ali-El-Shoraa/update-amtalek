function SubHeading({ style = "text-center", children }: any) {
  return (
    <p className={`text-base mt-1 opacity-80 ${style} asm:ltr:text-left asm:rtl:text-right`}>
      {children}
    </p>
  );
}

export default SubHeading;
