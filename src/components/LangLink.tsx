"use client";
import Link from "next/link";

function LangLink({ to, replace, children, className, title, onClick }: any) {
  return (
    <Link
      onClick={onClick}
      href={to} // استخدام href بدلاً من to
      replace={replace}
      title={title}
      className={className}
    >
      {children}
    </Link>
  );
}

export default LangLink;
