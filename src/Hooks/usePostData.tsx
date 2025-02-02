"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { userData } from "@/Store/Features/AuthenticationSlice";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_FULL}`,

  headers: {
    // "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "https://amtalek-next.vercel.app",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Authorization, Accept",
    "Access-Control-Allow-Credentials": true,
    // origin: "https://amtalek-next.vercel.app",
    mode: "no-cors",

    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",

  // "Access-Control-Allow-Origin": "*",
  // xsrfHeaderName: "X-XSRF-TOKEN",
  // withXSRFToken: true,
});
interface PosterFunctionArgs {
  api: string;
  data: any;
  file?: File | null;
}

export const usePostData = (
  showToasts = false,
  onSuccess: (data: any) => void,
  authorizedAPI: boolean,
  onError: (error: any) => void
) => {
  const user = useSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  //   const router = typeof window !== "undefined" ? useRouter() : null;

  const posterFunction = async ({ api, data, file }: PosterFunctionArgs) => {
    const ContentType = file ? "multipart/form-data" : "application/json";

    const headers = user?.token
      ? {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": ContentType,
          lang: lang,
        }
      : {
          "Content-Type": ContentType,
          lang: lang,
        };

    const options = {
      url: api,
      method: "POST",
      headers: headers,
      data: data,
    };

    const res = await axiosInstance(options);
    return res.data;
  };

  return useMutation<any, Error, PosterFunctionArgs>({
    mutationFn: posterFunction,
    onSuccess: (data) => {
      if (showToasts) {
        // التحقق من وجود رسالة خطأ مع رسالة النجاح
        if (data.errorMessage) {
          toast.error(data.errorMessage); // عرض رسالة الخطأ إذا كانت موجودة
        } else {
          toast.success(data.message); // عرض رسالة النجاح فقط إذا لم يكن هناك رسالة خطأ
        }
      }
      if (onSuccess) onSuccess(data);
    },
    onError: (error: any) => {
      if (onError) onError(error);
      if (showToasts && error?.response?.data?.status === 0) {
        // عرض رسالة الخطأ
        toast?.error(error?.response?.data?.message); // || "Something Wrong has happened!");
      }
      if (authorizedAPI && error?.response?.status === 401) {
      }
    },
  });
};
