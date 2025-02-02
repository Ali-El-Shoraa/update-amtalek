import Image from "next/image";
import Link from "next/link";

export default function CityCard({ city, t }: any) {
  return (
    <Link
      href={``}
      className="relative h-full hover:-translate-y-2 duration-300 ease-in-out text-custome-white transition-all hover:bg-transparent-blue active:scale-110"
    >
      <Image
        // loading="lazy"
        className="w-full h-full object-cover cursor-pointer group-hover:scale-110"
        src={city?.image}
        alt={city?.title}
        width={1000}
        height={1000}
      />
      <div className="absolute bottom-5 bg-gradient-to-t from-custome-blue/70 w-full h-4/5 flex justify-center items-center flex-col gap- z-40 group-hover:translate-y-1 translate-y-5 transition-all duration-300 ease-in-out text-bg">
        <h3 title={city?.title} className="text-3xl clg:text-xl font-medium truncate">
          {city?.title}
        </h3>

        <h4 className="rtl:rtl text-2xl">
          {t("CityCard.total_count_formatted", {
            count: city?.properties?.toLocaleString("en", { useGrouping: false }),
          })}
          {/* {city?.properties} عقارات */}
        </h4>

        <h3 className="rtl:rtl mt-3">
          {t("CityCard.rent_count_formatted", {
            count: city?.rent_properties?.toLocaleString("en", { useGrouping: false }),
          })}
          {/* {city?.rent_properties} عقارات للأيجار */}
        </h3>

        <h3 className="rtl:rtl ">
          {t("CityCard.sale_count_formatted", {
            count: city?.sale_properties?.toLocaleString("en", { useGrouping: false }),
          })}
          {/* {city?.sale_properties} عقارات للبيع */}
        </h3>
      </div>
    </Link>
  );
}
