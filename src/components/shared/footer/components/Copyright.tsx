import Link from "next/link";

export default function Copyright({ t, data }: any) {
  return (
    <div className="flex site_container bmd:flex-col asm:items-center gap-7 justify-between items-center">
      <h5 className="text-custome-white text-sm asm:text-center flex ss:flex-col justify-center items-center gap-1">
        <span>{data?.about?.copy_right}</span>
        <Link
          rel="noreferrer"
          target="_blank"
          href={data?.about?.linked_text_link}
          className="transition-all duration-300 ease-in-out hover:text-custome-yellow"
        >
          {data?.about?.linked_text} .
        </Link>
      </h5>
    </div>
  );
}
