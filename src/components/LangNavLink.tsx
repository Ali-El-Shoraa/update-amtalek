"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";

function LangNavLink({ to, replace, children, className, homepage, end, onClick }: any) {
  const router = useRouter();

  const handleClick = (event: any) => {
    if (onClick) onClick(event);

    // Handle replace and navigation
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };

  return (
    <Link href={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default LangNavLink;
