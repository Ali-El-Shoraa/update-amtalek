"use client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function RatingComponent({
  defaultRating,
  setValue,
  stateName,
  rating,
  placeholder,
  unMutable,
}: any) {
  const [hoverRating, setHoverRating] = useState(0);
  const currentRating = unMutable ? defaultRating : rating;

  return (
    <div className="w-full flex justify-start gap-3 items-center">
      {placeholder && <p className="opacity-50"> {placeholder}</p>}
      <div className="h-11 flex items-center gap-0.5">
        {[...Array(5)].map((star, index) =>
          unMutable ? (
            <FontAwesomeIcon
              className={`trns ${
                defaultRating > index ? "text-custome-yellow" : "text-custome-venice"
              }`}
              key={index}
              icon={faStar}
            />
          ) : (
            <FontAwesomeIcon
              className={`trns cursor-pointer  ${
                (hoverRating || currentRating) > index ? "text-custome-yellow" : "text-custome-venice"
              }`}
              onClick={() => setValue(stateName, index + 1)}
              onMouseOver={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
              key={index}
              icon={faStar}
            />
          )
        )}
      </div>
    </div>
  );
}

export default RatingComponent;
