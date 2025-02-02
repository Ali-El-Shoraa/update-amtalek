// "use client";
// // import { memo, useCallback, useEffect, useState } from "react";
// import { memo, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { CiClock2 } from "react-icons/ci";
// // import { faChevronDown, faCircleUser, faBell } from "@fortawesome/free-solid-svg-icons";
// // import favIconSrc from "/assets/images/fav-icon.png";
// import { useDispatch, useSelector } from "react-redux";
// import { userData } from "../../Store/Features/AuthenticationSlice";
// import NavDropDownMenu from "./NavDropDownMenu";
// import { useTranslation } from "react-i18next";
// // import { lang } from "../../Store/Features/MiscellaneousSlice";
// // import { LangLink, LangNavLink } from "../MainComponents/index";
// import Link from "next/link";
// import logoImg from "@/assets/images/navEnLogo.png";
// import arlogoImg from "@/assets/images/navArLogo.png";
// // import { TbSocial } from "react-icons/tb";
// // import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import { useFetchData, usePostData } from "@/Hooks/useAxios";
// import { QueryClient } from "@tanstack/react-query";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";

// // import { IconChevronDown, IconBell } from "shadcn/icons";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const Navbar = memo(function Navbar({ userdata, locale }: any) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const { t, i18n } = useTranslation("LayoutComponents");
//   // const lng = i18n.language.startsWith("ar") ? "" : "en";
//   const user = useSelector(userData);
//   const [burgerChecked, setBurgerChecked] = useState(false);
//   // const dispatch = useDispatch();

//   function handleBurgerChange(e: any) {
//     setBurgerChecked(e.target.checked);
//   }

//   // function changeLanguage(lang) {
//   //   i18n.changeLanguage(lang);
//   //   lang === "ar"
//   //     ? window.location.replace(window.location.origin)
//   //     : window.location.replace(window.location.origin + "/en");
//   //   localStorage.setItem("i18nextLng", lang);
//   // }

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);
//   // }, [useRouter().pathname]);

//   const clientquery = new QueryClient();
//   const {
//     data: notifications,
//     isSuccess,
//     refetch,
//   } = useFetchData(
//     "notifications",
//     `my-notifications`,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     5 * 60 * 1000,
//     !!user?.token
//   );
//   const { mutate }: any = usePostData(false, () => {
//     clientquery.invalidateQueries(["notifications"]);
//     refetch();
//   });

//   const items = isSuccess
//     ? notifications?.unseen_counter !== 0
//       ? [
//           {
//             key: "0",
//             label: (
//               <span className="flex cursor-default hover:bg-none items-center gap-2 bg-slate rounded p-1 absolute -top-8 left-1/2 -translate-x-1/2 font-medium text-lg w-full">
//                 {i18n.language?.startsWith("ar") ? "اخر الاشعارات" : "Latest Notifications"}
//               </span>
//             ),
//           },
//           ...notifications?.notifications?.map((item: any) => ({
//             key: item?.id,
//             label: (
//               <Link
//                 onClick={() =>
//                   mutate({
//                     api: `see-my-notification/${item?.id}`,
//                     data: undefined,
//                     file: undefined,
//                   })
//                 }
//                 href={item?.notification_type === "offer" ? "/my-received-offers" : "/messages"}
//                 className={`w-full flex items-center p-1 gap-5 rounded ${
//                   item?.seen_status === "no" ? "bg-gray-100" : ""
//                 }`}
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   src={
//                     item?.sender_data?.image === ""
//                       ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//                       : item?.sender_data?.image
//                   }
//                   className="w-12 h-12 rounded-full"
//                   alt="dsa"
//                 />
//                 <div className="flex flex-1 flex-col gap-1">
//                   <h2 className="font-semibold text-slate-600">{item?.title}</h2>
//                   <span className="text-slate-500">{item?.description}</span>
//                   <span className="text-xs text-slate-400 flex items-center gap-1">
//                     <CiClock2 /> {item?.time}
//                   </span>
//                 </div>
//               </Link>
//             ),
//           })),
//           {
//             key: "1543",
//             className: "!sticky bg-white bottom-[-4px] hover:!bg-white",
//             label: (
//               <Link
//                 // state={{ notifications }}
//                 href="/notifications"
//                 className=" flex items-center justify-center !text-white border border-primary hover:bg-white mx-auto hover:!text-primary p-1 gap-5 rounded bg-primary w-[90%]"
//               >
//                 {i18n.language?.startsWith("ar")
//                   ? "اظهار جميع الاشعارات"
//                   : "Show all Notifications"}
//               </Link>
//             ),
//           },
//         ]
//       : []
//     : [];

//   return (
//     <div className="relative">
//       {/* زر الإشعارات */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <button className="flex items-center gap-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition-all duration-200 ease-in-out">
//             {/* <IconBell className="text-xl" /> */}
//             {/* <IconChevronDown className="text-sm transition-transform duration-200 group-hover/grand:rotate-180" /> */}
//           </button>
//         </DropdownMenuTrigger>

//         {/* قائمة الإشعارات */}
//         <DropdownMenuContent className="w-64 bg-white shadow-lg rounded-lg p-2">
//           {notifications?.notifications?.map((item: any) => (
//             <DropdownMenuItem key={item.id} asChild>
//               <Link href={item.notification_type === "offer" ? "/my-received-offers" : "/messages"}>
//                 <div className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
//                   <Image
//                     width={100}
//                     height={100}
//                     src={
//                       item.sender_data?.image ||
//                       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//                     }
//                     alt="Profile"
//                     className="w-12 h-12 rounded-full"
//                   />
//                   <div className="flex flex-1 flex-col gap-1">
//                     <h2 className="font-semibold text-slate-600">{item.title}</h2>
//                     <span className="text-slate-500">{item.description}</span>
//                     <span className="text-xs text-slate-400 flex items-center gap-1">
//                       <CiClock2 /> {item.time}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// });

// export default Navbar;
