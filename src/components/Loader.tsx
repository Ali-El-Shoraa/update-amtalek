import { memo } from "react";
const Loader = memo(function Loader({ h }: any) {
  return (
    <section
      className={`w-full h-screen  ${
        h === "auto"
          ? "h-full"
          : h === "screen"
          ? "h-[calc(100vh-136px)]"
          : h === "m"
          ? "!h-[300px]"
          : "h-full"
      } flex justify-center items-center`}
    >
      <div className="pages__loader"></div>
    </section>
  );
});
export default Loader;
