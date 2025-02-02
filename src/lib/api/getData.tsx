// import { unstable_cache } from "next/cache";
// import { cookies } from "next/headers";

import { getAuthToken } from "@/lib/actions/auth-actions";

// import Cookies from "js-cookie";
export default async function getData(
  point: string,
  locale: string,
  token?: string,
  retries: number = 3 // تحديد عدد المحاولات القصوى
): Promise<any> {
  // إنشاء headers بشكل ديناميكي
  const headers: HeadersInit = {
    lang: locale || "ar",
  };

  // التحقق مما إذا كان token موجودًا
  const tokenVerification = await getAuthToken();
  if (tokenVerification) {
    headers["Authorization"] = `Bearer ${tokenVerification}`;
  }

  // دالة لجلب البيانات مع إضافة منطق المحاولة
  const fetchData = async (attempt: number): Promise<any> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}${point}`,
        {
          headers: headers,
          method: "GET",
          next: {
            revalidate: 0,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt < retries) {
        return fetchData(attempt + 1); // إعادة المحاولة
      }

      // إذا تجاوز الحد الأقصى للمحاولات
      return {
        props: {
          data: null,
          error: "Failed to fetch data after multiple attempts.",
        },
      };
    }
  };

  // استدعاء الدالة للمحاولة الأولى
  return fetchData(1);
}
