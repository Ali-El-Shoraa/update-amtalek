import { memo } from "react";

const QuickSummary = memo(function QuickSummary({ data }: any) {
  return (
    <div className="flex justify-between items-start md:flex-col md:items-center md:justify-start mt-7 gap-16  w-full  QuickSummary_table">
      <table className="  w-1/2 md:w-full">
        <tbody>
          {data?.slice(0, Math.ceil(data?.length / 2)).map((item: any) => (
            <tr key={item?.id}>
              <td className="font-medium">{item?.key} </td>
              <td className="text-end"> {item?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length > 1 && (
        <table className="w-1/2 md:w-full">
          <tbody>
            {data?.slice(Math.ceil(data?.length / 2)).map((item: any) => (
              <tr key={item?.id}>
                <td className="font-medium">{item?.key} </td>
                <td className="text-end"> {item?.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
});

export default QuickSummary;
