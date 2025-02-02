"use client";
import { useCallback } from "react";
import { useRef } from "react";
import {
  toggleLogOutPopUp as toggleLogOutPopUpREdux,
  setToggleLogOutPopUp,
} from "@/Store/Features/MiscellaneousSlice";
import { useSelector, useDispatch } from "react-redux";

import { useHandleLogOut } from "@/Utilities/index";
import { SubmitBtnComponent } from "@/FormComponents";
import { useTranslation } from "react-i18next";

function LogOutPopUp() {
  const { t } = useTranslation("SettingsLayout");
  const toggleLogOutPopUp = useSelector(toggleLogOutPopUpREdux);
  const LogOutOfferPopUpContent = useRef<HTMLFormElement>(null);
  const dispatchRedux = useDispatch();

  const [logOut, isLoading] = useHandleLogOut();

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      logOut();
    },
    [logOut]
  );

  return (
    <section
      onClick={(e: any) => {
        if (!LogOutOfferPopUpContent?.current?.contains(e.target)) {
          dispatchRedux(setToggleLogOutPopUp(false));
        }
      }}
      className={`w-full h-screen ${
        toggleLogOutPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000] `}
    >
      <div className="relative w-full h-full  flex justify-center items-center">
        <div className="LogOutOfferPopUp__absolute absolute h-full w-full bg-secondary opacity-40"></div>

        <form
          ref={LogOutOfferPopUpContent}
          method="post"
          onSubmit={onSubmit}
          className={`add__comment--form  w-1/2 asm:w-11/12 bg-grey flex flex-col justify-start gap-6 ${
            toggleLogOutPopUp ? "scale-100" : "scale-0"
          } trns origin-bottom shadow-lg !p-9 rounded`}
        >
          <h2 className="text-2xl font-medium w-full text-center">
            {t("LogOutPopUp.LogOutPopUpTitle")}
          </h2>

          {/** Submit Button */}
          <div className="w-full flex justify-between items-center mt-5">
            <button
              type="button"
              onClick={() => {
                dispatchRedux(setToggleLogOutPopUp(false));
              }}
              className={`  group  round w-24 h-10 trns bg-delete text-bg  hover:bg-transparent border-delete border-2 hover:text-delete active:scale-90 flex items-center justify-center  `}
            >
              {t("LogOutPopUp.CancelBtnText")}
            </button>

            <SubmitBtnComponent
              disabled={isLoading}
              isLoading={isLoading}
              value={t("LogOutPopUp.SubmitBtnText")}
              width={"w-28 md:-mt-0.5"}
              alignment={"horizontal"}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default LogOutPopUp;
