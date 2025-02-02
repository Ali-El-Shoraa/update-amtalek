import Link from "next/link";

export default function ButtonSections({ title, className, to }: any) {
  return (
    // <div
    //   className={`bg-custome-blue w-fit mx-auto px-4 py-3 text-custome-white border-2 border-custome-blue rounded transition-colors duration-300 ease-in-out hover:text-custome-blue hover:bg-transparent ${className}`}
    // >
    <Link
      className={`bg-custome-blue block w-fit mx-auto px-4 py-3 text-custome-white border-2 border-custome-blue rounded transition-colors duration-300 ease-in-out hover:text-custome-blue hover:bg-transparent ${className}`}
      href={to ? to : ""}
    >
      {title}
    </Link>
    // </div>
  );
}
