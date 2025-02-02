import Heading from "@/components/Heading";
import Image from "next/image";

export default function PropertyAminities({ data, locale, t }: any) {
  return (
    <>
      {data?.aminities?.length > 0 && (
        <div className="Property__BENEFITS--AMENITIES w-full">
          <Heading>
            {" "}
            {t("headings.aminities", {
              defaultValue: t("headings.aminities", {
                lng: locale === "en" ? "en" : "",
              }),
            })}{" "}
          </Heading>
          <ul className="mt-7 grid grid-cols-3 gap-5 asm:grid-cols-2 sm:grid-cols-1  w-full !list-disc">
            {data?.aminities?.map((item: any) => (
              <li key={item?.id} className="flex justify-start items- gap-3">
                <div className="w-10 h-10 bg-[#D9D9D9] aspect-square rounded-full border-[#D9D9D9] border-2  flex justify-center items-center mt-[2px]">
                  <span className=" w-3/4 h-3/4 min-w-[6px] min-h-[6px] block">
                    <Image width={200} height={200} src={item?.image} alt="icon" />
                  </span>
                </div>
                <h3 className=" relative group cursor-default  h-7 flex flex-col justify-center h-full w-fit">
                  {item?.title}
                  <hr className=" border-0 border-custome-blue w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border" />
                </h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
