"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { fetchUserProfile,  userData } from "@/store/AuthorizedSlice";
import { useTranslation } from "react-i18next";
import {
  fetchUserProfile,
  userData,
  userProfileDataOut,
} from "@/Store/Features/AuthenticationSlice";

const UserProfileComponent = ({ children }: any) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  // قراءة بيانات المستخدم من الحالة
  const user = useSelector(userData);

  // قراءة بيانات ملف التعريف من الحالة
  // const userProfile = useSelector((state: any) => state.Authentication.userProfileDataOut);

  useEffect(() => {
    if (user?.token && user?.data?.actor_type && user?.data?.id) {
      dispatch(
        fetchUserProfile({
          token: user.token,
          language: i18n.language,
          userData: user.data,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

  return children;
};

export default UserProfileComponent;
