import { Select, Space } from "antd";
import type { SelectProps } from "antd";
import Image from "next/image";
import { GetServerSideProps } from "next";
import getData from "@/lib/api/getData";

// نوع البيانات المتوقع
interface Country {
  id: number;
  title: string;
  image: string;
}

interface Props {
  countries: Country[];
  selectedCountry: Country | null;
}

export default async function CountrySelect({ locale }: any) {
  const response = await getData("web/countries", locale);
  const currentCountry =
    typeof window !== "undefined"
      ? localStorage?.getItem("country") || "1"
      : "1";
  const countries: Country[] = response.data || [];
  const selectedCountry =
    countries?.find((item) => item.id === parseInt(currentCountry)) || null;

  //
  // تعيين أول دولة كافتراضية في حال عدم وجود دولة محددة
  const defaultCountry = selectedCountry || countries[0];

  const options: SelectProps["options"] = countries?.map((item) => ({
    value: item.id,
    label: (
      <div className="flex items-center gap-2">
        <Image
          alt={item.title}
          src={item.image}
          className="w-6 h-6 rounded-full"
          width={24} // تعيين عرض الصورة
          height={24} // تعيين ارتفاع الصورة
        />
        {item.title}
      </div>
    ),
  }));

  return (
    <>
      :
      <Space direction="vertical" className="w-36 flex ss:w-1/2">
        <Select
          size={"middle"}
          defaultValue={defaultCountry?.id} // تعيين أول قيمة كافتراضية
          style={{ width: "100%", backgroundColor: "transparent" }} // تعيين الخلفية كـ transparent
          options={options}
          placeholder={
            defaultCountry && (
              <div className="flex items-center gap-2 !text-white !justify-center">
                <Image
                  src={defaultCountry.image}
                  alt={defaultCountry.title}
                  className="w-6 h-6 rounded-full bg-white"
                  width={24} // تعيين عرض الصورة
                  height={24} // تعيين ارتفاع الصورة
                />
                {defaultCountry.title}
              </div>
            )
          }
          className="text-sm"
        />
      </Space>
    </>
  );
}

// وظيفة getServerSideProps لجلب البيانات من الخادم
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const locale = (context.query.locale as string) || "ar"; // استخدام اللغة المحددة أو الافتراضية

  // جلب البيانات من الخادم
  const response = await getData("web/countries", locale);
  const countries: Country[] = response.data || [];

  // تحديد الدولة الافتراضية من localStorage
  const currentCountry =
    typeof window !== "undefined"
      ? localStorage.getItem("country") || "1"
      : "1";
  const selectedCountry =
    countries.find((item) => item.id === parseInt(currentCountry)) || null;

  return {
    props: {
      countries,
      selectedCountry,
    },
  };
};
