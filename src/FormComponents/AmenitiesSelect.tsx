import { Select, Space } from "antd";
import type { SelectProps } from "antd";
import Image from "next/image";
import { useTranslation } from "react-i18next";



function AmenitiesSelect({ t, amenitiesData, getValues, setValue }: any) {
  const options: SelectProps["options"] = [];
  const { i18n } = useTranslation();

  for (let i = 0; i < amenitiesData?.length; i++) {
    options.push({
      value: amenitiesData?.[i]?.id,
      label: (
        <div
          // style={{ display: "flex", alignItems: "center" }}
          className={`flex items-center gap-4  ${
            i18n.language.startsWith("ar") ? "!font-cairo" : "!font-poppins"
          }`}
        >
          <Image
            width={1000}
            height={1000}
            src={amenitiesData?.[i]?.image} // استبدل هذا بالمسار الصحيح للصورة
            alt={amenitiesData?.[i]?.title}
            className="w-5 h-5 mr-2"
            // style={{ width: "20px", height: "20px", marginRight: "8px" }} // تعديل حجم الصورة
          />
          <div className={` ${i18n.language.startsWith("ar") ? "font-cairo" : "font-poppins"}`}>
            {amenitiesData?.[i]?.title}
          </div>
        </div>
      ),
    });
  }

  const handleChange = (value: string | string[]) => {
    setValue("amenities", value);
  };

  return (
    <>
      {/* direction="vertical" */}
      <Space style={{ width: "100%" }}>
        <Select
          rootClassName={`amenities_Home ${
            i18n.language.startsWith("ar") ? "!font-cairo" : "!font-poppins"
          }`}
          mode="multiple"
          size={"large"}
          className={` ${i18n.language.startsWith("ar") ? "!font-cairo" : "!font-poppins"}`}
          placeholder={t("Amentias.placeholder", "اختر الامتيازات")}
          onChange={handleChange}
          style={{ width: "100%", color: "var(--primary-color)" }}
          dropdownStyle={{
            color: "#005879",
          }}
          options={options}
          // filterOption={(input: any, option: any) => {
          //   const labelText = option?.label?.props?.children[1]; // الحصول على النص
          //   return (labelText ?? "")?.toLowerCase()?.includes(input?.toLowerCase());
          // }}
          // filterSort={(optionA: any, optionB: any) => {
          //   const textA = optionA?.label?.props?.children[1]; // الحصول على النص من الخيار الأول
          //   const textB = optionB?.label?.props?.children[1]; // الحصول على النص من الخيار الثاني
          //   return (textA ?? "")?.toLowerCase()?.localeCompare((textB ?? "")?.toLowerCase());
          // }}
          filterSort={(optionA: any, optionB: any) => {
            const textA = String(optionA?.label?.props?.children[1] ?? "").toLowerCase();
            const textB = String(optionB?.label?.props?.children[1] ?? "").toLowerCase();
            return textA.localeCompare(textB);
          }}
        />
      </Space>
    </>
  );
}

export default AmenitiesSelect;

// import { Select, Space } from "antd";
// import type { SelectProps } from "antd";
// import Image from "next/image";

// function AmenitiesSelect({ t, amenitiesData, getValues, setValue }: any) {
//   const options: SelectProps["options"] = [];

//   for (let i = 0; i < amenitiesData?.length; i++) {
//     options.push({
//       value: amenitiesData[i]?.id,
//       label: (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <Image
//             width={1000}
//             height={1000}
//             src={amenitiesData[i]?.image} // استبدل هذا بالمسار الصحيح للصورة
//             alt={amenitiesData[i]?.title}
//             style={{ width: "20px", height: "20px", marginRight: "8px" }} // تعديل حجم الصورة
//           />
//           {amenitiesData[i]?.title}
//         </div>
//       ),
//     });
//   }

//   const handleChange = (value: string | string[]) => {
//     setValue("amenities", value);
//   };

//   return (
//     <>
//       <Space direction="vertical" style={{ width: "100%" }}>
//         <Select
//           rootClassName="amenities_Home"
//           mode="multiple"
//           size={"large"}
//           placeholder={t("Amentias.placeholder", "اختر الامتيازات")}
//           onChange={handleChange}
//           style={{ width: "100%", color: "var(--primary-color)" }}
//           dropdownStyle={{
//             // backgroundColor: "var(--dropdown-background-color)",
//             color: "#005879",
//           }}
//           options={options}
//           filterOption={(input: any, option: any) =>
//             (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
//           }
//           filterSort={(optionA: any, optionB: any) =>
//             (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
//           }
//         />
//       </Space>
//     </>
//   );
// }

// export default AmenitiesSelect;
