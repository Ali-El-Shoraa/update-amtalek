import Link from "next/link";
import { FaClock } from "react-icons/fa";

export default function ModernNews({ data, t }: any) {
  return (
    //  asm:items-center
    <div className="w-full h-full flex flex-col justify-start px-3 ">
      <h2 className="text-xl  mb-9 ss:mb-3">{t("Footer.third_column.title")}</h2>
      {/* md:items-center */}
      <ul className="  h-full flex flex-col items-start justify-start gap-7 ">
        {data?.news?.slice(0, 3)?.map((news: any) => (
          <li key={news?.id}>
            <Link
              //   state={{ id: news?.id }}
              //   className="opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out border-b-secondary border-b-2  active:scale-90 "
              className="opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out border-b-custome-blue border-b-2  active:scale-90 "
              href={`/news/${news?.id}/${news?.title?.replace(/\s+/g, "-")}`}
              title={news?.title}
            >
              {news?.title.substring(0, 50)}
              {news?.title.length > 50 && "..."}
            </Link>
            <div className="news__date text-sm flex gap-2 justify-start items-center opacity-80">
              <FaClock />
              {news?.created_at}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
