"use client";

import { usePostData } from "@/Hooks/usePostData";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FavoriteButton({ className, is_fav, id, data }: any) {
  const user = useSelector(userData);
  const [isFavorite, setIsFavorite] = useState(Number(is_fav) === 1); // إذا كان is_fav تساوي 1 المنتج في المفضلة

  const { mutate }: any = usePostData(
    true,
    () => {},
    true,
    (error: any) => {
      console.error("An error occurred:", error);
    }
  );

  const dispatchRedux = useDispatch();

  const handleFavoriteToggle = () => {
    if (!user?.token) {
      dispatchRedux(setShowLoginPopUp(true));
      return;
    }

    const api = `${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE}`;

    mutate({
      api: api,
      data: { property_id: id },
      file: undefined,
    });

    // تغيير حالة المفضلة من 0 إلى 1 أو العكس
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className={`property__love ${className}`} onClick={handleFavoriteToggle}>
      <div
        className="heart-container"
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        <input
          defaultChecked={data?.cards[0]
            .filter((item1: any) =>
              user?.data?.favorite_list?.some((item2: any) => item2.id === item1.id)
            )
            .find((item: any) => item.id === id)}
          type="checkbox"
          className="heart-checkbox"
          id={id}
          checked={isFavorite} // تحقق بناءً على الحالة isFavorite
          readOnly // جعل الحقل للعرض فقط
        />
        <div className="svg-container">
          {/* {isFavorite ? ( */}
          {/* // عرض SVG للقلب الممتلئ عندما تكون المفضلة فعالة */}
          <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
          </svg>
          {/* // ) : ( */}
          {/* // عرض SVG للقلب الفارغ عندما لا تكون المفضلة فعالة */}
          <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
          </svg>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
