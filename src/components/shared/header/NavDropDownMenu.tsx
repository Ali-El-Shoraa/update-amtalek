// import { faArrowRightFromBracket, faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useDispatch, useSelector } from "react-redux";
// import { setToggleLogOutPopUp } from "../../Store/Features/MiscellaneousSlice.tsx";
// import { Trans, useTranslation } from "react-i18next";
// import userImg from "/assets/images/userImgNotLogin.png";
// import { userProfileData } from "../../../src/Store/Features/AuthenticationSlice.tsx";
// import { TUser } from "@/src/Types/AppTypes.ts";
// import { Link } from "react-router-dom";
// import { IoIosLogOut } from "react-icons/io";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Menu from "@mui/material/Menu";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import type { MenuProps } from "antd";
// import { Button, Dropdown, Space } from "antd";

// type TProps = {
//   ForRealEstate?: boolean;
//   user?: TUser;
// };

// function NavDropDownMenu({ ForRealEstate, user }: TProps) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const userProfile = useSelector(userProfileData) as TUser;
//   // const [open, setOpen] = useState(false);
//   const dispatchRedux = useDispatch();
//   const { t, i18n } = useTranslation("LayoutComponents");

//   const items: MenuProps["items"] = [
//     {
//       key: "1",
//       label: (
//         <div className={`  w-72 ${ForRealEstate && "h-96"}  `}>
//           <div
//             className={`flex  flex-col ${
//               ForRealEstate ? "justify-center items-center p-7" : "p-2"
//             } w-full h-full ${ForRealEstate ? "bg-grey" : "bg-white "}  gap-3 shadow-lg rounded`}
//           >
//             {ForRealEstate ? (
//               <>
//                 <div className="flex flex-col gap-7 mt-5 mb-3">
//                   <img
//                     className="flex mx-auto w-20 h-20 rounded-full"
//                     src={
//                       userProfile?.actor_type === "broker"
//                         ? userProfile?.logo
//                         : "/assets/images/fav-icon.png"
//                     }
//                     alt="dsa"
//                   />

//                   <Link
//                     target={
//                       userProfile?.actor_type === "broker" && userProfile?.has_package === "yes"
//                         ? "_blank"
//                         : "_self"
//                     }
//                     to={`${
//                       userProfile?.actor_type === "broker" && userProfile?.has_package === "yes"
//                         ? userProfile?.dashboard_link
//                         : userProfile?.actor_type === "broker" && userProfile?.has_package === "no"
//                         ? `packages/${userProfile?.actor_type}`
//                         : `${i18n.language.startsWith("ar") ? "" : "/en"}/profile`
//                     }`}
//                     className=" w-full round  h-10  flex justify-start items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg  cursor-pointer"
//                   >
//                     <FontAwesomeIcon icon={faCircleUser} className=" text-lg cursor-pointer" />
//                     {userProfile?.actor_type === "broker"
//                       ? t("NavDropDownMenu.menu_items.my_dashboard.btn_txt")
//                       : t("NavDropDownMenu.menu_items.my_profile.btn_txt")}
//                   </Link>
//                   <button
//                     onClick={() => dispatchRedux(setToggleLogOutPopUp(true))}
//                     className=" w-full round h-10 flex justify-start items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg  "
//                   >
//                     <FontAwesomeIcon
//                       icon={faArrowRightFromBracket}
//                       className=" text-lg cursor-pointer"
//                     />
//                     {t("NavDropDownMenu.menu_items.Log_out.btn_txt")}
//                   </button>
//                 </div>
//                 <div className="flex gap-2 opacity-70">
//                   <Trans
//                     className="opacity-70 flex"
//                     i18nKey="NavDropDownMenu.menu_items.welcome"
//                     t={t}
//                   >
//                     Welcome {{ name: user?.first_name + " " + user?.last_name }}
//                   </Trans>
//                 </div>
//                 {/* <p className="opacity-70">
//                   {" "}
//                   {t("NavDropDownMenu.menu_items.welcome", {
//                     name: user?.first_name + " " + user?.last_name,
//                   })}
//                 </p> */}
//               </>
//             ) : (
//               <div className="w-full flex flex-col gap-4">
//                 <Link
//                   to={`/${i18n.language.startsWith("en") ? "en" : "ar"}/Amtalek-Profile`}
//                   className="w-full flex gap-4 items-center p-3 hover:bg-grey rounded transition-[300]"
//                 >
//                   <img
//                     src={userProfile?.image ? userProfile?.image : userImg}
//                     alt="user"
//                     className="h-[32px] w-[32px] rounded-full"
//                   />
//                   <span>{userProfile?.first_name}</span>
//                 </Link>
//                 <Link
//                   to=""
//                   className="w-full flex gap-4 items-center p-3 hover:bg-grey rounded transition-[300]"
//                 >
//                   <img
//                     src={userProfile?.image ? userProfile?.image : userImg}
//                     alt="user"
//                     className="h-[32px] w-[32px] rounded-full"
//                   />
//                   <span>{userProfile?.first_name}</span>
//                 </Link>
//                 <Link
//                   to=""
//                   className="w-full flex gap-4 items-center p-3 hover:bg-grey rounded transition-[300]"
//                 >
//                   <img
//                     src={userProfile?.image ? userProfile?.image : userImg}
//                     alt="user"
//                     className="h-[32px] w-[32px] rounded-full"
//                   />
//                   <span>{userProfile?.first_name}</span>
//                 </Link>
//                 <button
//                   onClick={() => dispatchRedux(setToggleLogOutPopUp(true))}
//                   className="w-full flex gap-4 items-center p-3 hover:bg-grey rounded transition-[300] text-[#E50B0B]"
//                 >
//                   <span className={`${i18n.language === "ar" ? "rotate-180" : ""}`}>
//                     <IoIosLogOut size={30} />
//                   </span>
//                   {t("NavDropDownMenu.menu_items.Log_out.btn_txt")}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="sigin__wrapper grou relative ">
//       <Dropdown
//         rootClassName="navbarDropDown"
//         trigger={["click"]}
//         menu={{ items }}
//         placement="bottom"
//       >
//         <button className="  h-14  aspect-square rounded-full border-2 border-secondary p-1 overflow-hidden">
//           <img
//             className="w-full h-full object-cover rounded-full"
//             src={
//               userProfile?.actor_type === "broker"
//                 ? userProfile?.logo
//                 : userProfile?.image
//                 ? userProfile?.image
//                 : userImg
//             }
//             alt={"user"}
//           />
//         </button>
//       </Dropdown>
//     </div>
//   );
// }

// export default NavDropDownMenu;
