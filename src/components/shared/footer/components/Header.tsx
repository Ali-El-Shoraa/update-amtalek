import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Header({ data }: any) {
  return (
    
    <div className="footer-absolute-top  z-30 absolute right-1/2 translate-x-1/2 top-0 -translate-y-1/2 w-[70%] xlll:w-[80%] h-32 round bg-custome-venice shadow-md shadow-grey/20 text-custome-blue flex justify-between items-center gap-8 px-10 xl:gap-0 xl:px-5   lg:flex-col lg:items-start lg:h-56 lg:justify-center lg:gap-7 lg:w-80 lg:px-7 ss:p-3">
      <div className="flex items-center justify-center gap-3">
        <span className="rounded-full bg-custome-blue text-custome-white p-2">
          <FaPhone />
        </span>
        <h3>{data?.phone}</h3>
      </div>

      <div className="flex items-center justify-center gap-3">
        <span className="rounded-full bg-custome-blue text-custome-white p-2">
          <FaLocationDot />
        </span>
        <h3>{data?.address}</h3>
      </div>

      <div className="flex items-center justify-center gap-3">
        <span className="rounded-full bg-custome-blue text-custome-white p-2">
          <MdEmail />
        </span>
        <h3>{data?.email}</h3>
      </div>
    </div>
  );
}
