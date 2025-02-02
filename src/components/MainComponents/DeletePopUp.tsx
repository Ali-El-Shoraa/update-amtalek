"use client";
import { useCallback } from "react";
import { usePostData } from "@/Hooks/useAxios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { userData } from "@/Store/Features/AuthenticationSlice";
import {
  toggleDeletePopUp as toggleDeletePopUpREdux,
  setToggleDeletePopUp,
  DeletedItem as DeletedItemREdux,
  setDeletedItem,
} from "@/Store/Features/MiscellaneousSlice";
import { useSelector, useDispatch } from "react-redux";
// import SubmitBtnComponent from "../FormComponents/SubmitBtnComponent";
import { useTranslation } from "react-i18next";
import { SubmitBtnComponent } from "@/FormComponents";
// import Cookies from "js-cookie"; // استيراد مكتبة js-cookie

function DeletePopUp({ api, params = {}, onSuccess }: any) {
  const user = useSelector(userData);
  const toggleDeletePopUp = useSelector(toggleDeletePopUpREdux);
  const DeletedItem = useSelector(DeletedItemREdux);
  const DeleteOfferPopUpContent = useRef<any>(null);
  const dispatchRedux = useDispatch();
  const { t } = useTranslation();
  const { mutate, isLoading }: any = usePostData(
    true,
    () => {
      dispatchRedux(setToggleDeletePopUp(false));
      dispatchRedux(setDeletedItem(null));

      // مسح الـ cookies عند تسجيل الخروج
      // Cookies.remove("userData");
      // Cookies.remove("token");

      onSuccess && onSuccess();
    },
    true, // authorizedAPI (تعديل لتوفير القيمة المطلوبة)
    (error) => {
      console.error("Error:", error); // دالة الخطأ
    }
  );

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (user?.token) {
        mutate({ api: api, data: { property_id: DeletedItem } });
      } else {
        toast.error(t("DeletePopUp.toast_error"));
      }
    },
    [user?.token, DeletedItem, mutate, api, t]
  );

  return (
    <section
      onClick={(e) => {
        if (!DeleteOfferPopUpContent.current.contains(e.target)) {
          dispatchRedux(setToggleDeletePopUp(false));
          dispatchRedux(setDeletedItem(null));
        }
      }}
      className={`w-full h-screen ${
        toggleDeletePopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000] `}
    >
      <div className="relative w-full h-full  flex justify-center items-center">
        <div className="DeleteOfferPopUp__absolute absolute h-full w-full bg-secondary opacity-40"></div>

        <form
          ref={DeleteOfferPopUpContent}
          method="post"
          onSubmit={onSubmit}
          className={`add__comment--form  w-1/2 asm:w-11/12 bg-grey flex flex-col justify-start p-5  gap-6 ${
            toggleDeletePopUp ? "scale-100" : "scale-0"
          } trns origin-bottom shadow-lg !p-9 round`}
        >
          <h2 className="text-2xl font-medium w-full text-center">
            {t("DeletePopUp.DeletePopUpTitle")}
          </h2>

          {/** Submit Button */}
          <div className="w-full flex justify-between items-center mt-5">
            <button
              type="button"
              onClick={() => {
                dispatchRedux(setToggleDeletePopUp(false));
                dispatchRedux(setDeletedItem(null));
              }}
              className={`  group  round w-24 h-10 trns bg-delete text-bg  hover:bg-transparent border-delete border-2 hover:text-delete active:scale-90 flex items-center justify-center  `}
            >
              {t("DeletePopUp.CancelBtnText")}
            </button>
            <SubmitBtnComponent
              disabled={isLoading}
              isLoading={isLoading}
              value={t("DeletePopUp.SubmitBtnText")}
              width={"w-28 md:-mt-0"}
              alignment={"horizontal"}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default DeletePopUp;
