"use client";
import { useCallback, useState } from "react";
// import { RatingComponent } from "../SubComponents";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { RatingComponent } from "../SubComponents";

function Comments({ data, locale }: any) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const handleShowComments = useCallback(
    () => setShowComments((prev) => !prev),
    [setShowComments]
  );
  const { i18n } = useTranslation();

  return (
    <div className="mt-7 flex flex-col items-start gap-9">
      {data?.map((comment: any) => {
        return (
          <div
            key={comment?.id}
            className="single__comment flex justify-start gap-12 order-b-[1px] order-b-primary/20 max-w-[70%] md:max-w-full "
          >
            <Image
              width={100}
              height={100}
              className="w-14 min-w-[56px] h-14 min-h-[56px] border-[2px] border-primary p-1 aspect-auto rounded-full"
              src={comment?.user_image}
              alt={comment?.id}
            />
            <div className=" flex flex-col">
              <h3 className="font-medium mb-1 flex items-center gap-2">
                <span>{comment?.user_name}</span>
                <span className="text-xs opacity-70 ">
                  {" "}
                  {comment?.created_at}
                </span>
              </h3>
              <p className="text-[14px]  overflow-hidden">
                {showComments
                  ? comment?.user_comment
                  : comment?.user_comment?.slice(0, 200) + "..."}
              </p>
              {comment?.user_comment?.length > 200 && (
                <button
                  onClick={handleShowComments}
                  className="text-sm ms-auto underline text-red-500"
                >
                  {!showComments
                    ? i18n.language === "en"
                      ? "Read more "
                      : "قراءة المزيد"
                    : i18n.language === "en"
                    ? "Show less "
                    : "قراءة الاقل"}
                </button>
              )}
              <RatingComponent unMutable defaultRating={comment?.stars} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
