import initTranslations from "@/app/i18n";
import { setUserProfileData, userData } from "@/Store/Features/AuthenticationSlice";
import useHandleLogOut from "@/Utilities/useHandleLogOut";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// تعديل baseURL لاستخدام القيمة بشكل صحيح من env
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_FULL,
});

export const useFetchData = async (
  identifier: any,
  api: any,
  showToasts = false,
  select = false,
  id = "",
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  authorizedAPI = false,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
  addToken = false
) => {
  const dispatchRedux = useDispatch();
  const user = useSelector(userData);
  const { i18n } = useTranslation();
  // const { i18n } = await initTranslations();
  // const isArabic = i18n.language?.startsWith("ar") ? "ar" : "en";
  const isArabic = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const options: UseQueryOptions<any, any> & { onSuccess: (data: any) => void } & {
    onError: (data: any) => void;
  } = {
    queryKey: [identifier, id],
    queryFn: () => fetcherFunction({ api, authorizedAPI, user, lang: isArabic, addToken }),
    onSuccess: (data: any) => {
      if (identifier === "userDataProf") {
        dispatchRedux(setUserProfileData(data));
      }
      if (showToasts) {
        toast.success(data.message);
      }
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {
      if (showToasts) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
      console.error("Error from custom hook", identifier, error, api);
      if (error?.response?.status === 404) {
        location.replace(`${isArabic === "ar" ? "" : "/en"}/not-found`);
      }
      if (authorizedAPI && error?.response?.status === 401) {
        location.replace(`${isArabic === "ar" ? "" : "/en"}`);
        logOut();
      }
      if (onError) {
        onError(error);
      }
    },
    select: (data: any) => {
      return select ? data[0] : data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled,
    staleTime: staleTime,
    retry: 2,
  };

  return useQuery({ ...options });
};

async function fetcherFunction({
  api,
  authorizedAPI,
  user,
  lang,
  addToken,
}: {
  api: any;
  authorizedAPI: boolean;
  user: any;
  lang: string;
  addToken: boolean;
}) {
  try {
    const headers: any = {
      "Accept-Language": lang,
    };

    if (authorizedAPI && addToken) {
      headers.Authorization = `Bearer ${user.token}`;
    }

    const response = await axiosInstance.get(api, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Fetcher function error:", error);
    throw error;
  }
}
