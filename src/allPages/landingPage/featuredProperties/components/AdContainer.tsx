// import Image from "next/image";

// function AdContainer({ src, title, sub_title, link, alt, className, alignment = "V" }: any) {
//   //!add the height and it is uppercase for V or H
//   return (
//     <a
//       href={link}
//       rel="noreferrer"
//       target="_blank"
//       className={`group w-full overflow-hidden flex relative flex-col justify-center items-center gap-5 text-bg  ${
//         alignment === "H" ? "h-[270px]" : "h-fit"
//       } ${className}`}
//     >
//       <Image
//         width={1000}
//         height={1000}
//         // loading="lazy"
//         className={`absolute  inset-0 -z-20 object- trns group-hover:scale-110 w-full  h-full`}
//         src={src}
//         alt={alt}
//       />
//       <div
//         className={`ad_bg--overlay -z-10 absolute w-full h-full inset-0 ${
//           (title || sub_title) && "bg-black/30"
//         } `}
//       ></div>
//       {title && <h3 className="text-2xl font-medium">{title}</h3>}
//       {sub_title && <h4>{sub_title}</h4>}
//     </a>
//   );
// }

// export default AdContainer;
