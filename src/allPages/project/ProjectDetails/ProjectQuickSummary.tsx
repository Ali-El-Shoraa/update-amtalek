import { memo } from "react";

const ProjectQuickSummary = memo(function QuickSummary({ data, t }: any) {
  return (
    <div className="flex justify-between items-start md:flex-col md:items-center md:justify-start mt-7 gap-16  w-full  QuickSummary_table">
      <table className="  w-1/2 md:w-full">
        <tbody>
          <tr>
            <td className="font-medium !min-w-fit whitespace-nowrap ">
              {t("QuickSummary.Address")}{" "}
            </td>
            <td className="text-end sm:text-sm"> {data?.address}</td>
          </tr>
          <tr>
            <td className="font-medium !min-w-fit whitespace-nowrap ">
              {t("QuickSummary.Start_Price")}{" "}
            </td>
            <td className="text-end">
              {" "}
              {data?.Start_Price.toLocaleString("en")} {data?.currency}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="w-1/2 md:w-full ">
        <tbody>
          <tr>
            <td className="font-medium !min-w-fit whitespace-nowrap ">
              {t("QuickSummary.bedrooms")}{" "}
            </td>
            <td className="text-end"> {data?.bedrooms}</td>
          </tr>
          {data?.delivery_time && (
            <tr>
              <td className="font-medium !min-w-fit whitespace-nowrap  ">
                {t("QuickSummary.Delivery_Date")}{" "}
              </td>
              <td className="text-end"> {data?.delivery_time}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default ProjectQuickSummary;
