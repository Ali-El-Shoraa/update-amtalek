// import { useState } from "react";

function CheckBox({
  register,
  name,
  label,
  value,
  errors,
  ServerErrors,
  width = "",
  Bgcolor = "light",
  searchOption,
  onCheckChange,
}: any) {
  return (
    <div
      className={`flex w-fit items-center justify-center ${
        searchOption ? "gap-2" : "gap-5"
      }  bg- ${width}`}
    >
      <div className="checkbox-wrapper">
        <div className="cbx">
          <input
            id={name}
            className="signin-inputs w-full"
            type="checkbox"
            name={name}
            defaultValue={value}
            onChange={(e) => onCheckChange(name, e.target.checked)}
            {...register(`${name}`, { valueAsNumber: true })}
          />
          <label htmlFor={name}></label>
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo-12">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4"
                result="blur"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                result="goo-12"
              ></feColorMatrix>
              <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>

      <label
        className={`w-fit cursor-pointer ${
          Bgcolor === "dark" ? "text-custome-white" : "text-custome-blue"
        } ${searchOption && " text-xs axs:text-base font-medium w-full"}`}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBox;

// function CheckBox({
//   register,
//   name,
//   label,
//   value,
//   errors,
//   ServerErrors,
//   width = "",
//   Bgcolor = "light",
//   searchOption,
// }: any) {
//   return (
//     <div
//       className={`flex w-fit  items-center justify-center ${
//         searchOption ? "gap-2" : "gap-5"
//       }  bg- ${width}`}
//     >
//       <div className="checkbox-wrapper">
//         <div className="cbx">
//           <input
//             id={name}
//             className="signin-inputs w-full"
//             type="checkbox"
//             name={name}
//             defaultValue={value}
//             {...register(`${name}`, { valueAsNumber: true })}
//           />
//           <label htmlFor={name}></label>
//           <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
//             <path d="M2 8.36364L6.23077 12L13 2"></path>
//           </svg>
//         </div>

//         <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//           <defs>
//             <filter id="goo-12">
//               <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
//               <feColorMatrix
//                 in="blur"
//                 mode="matrix"
//                 values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
//                 result="goo-12"
//               ></feColorMatrix>
//               <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
//             </filter>
//           </defs>
//         </svg>
//       </div>

//       <label
//         className={`w-fit  cursor-pointer ${
//           Bgcolor === "dark" ? "text-custome-white" : "text-custome-blue"
//         } ${searchOption && " text-xs axs:text-base font-medium w-full"}`}
//         htmlFor={name}
//       >
//         {label}
//       </label>
//     </div>
//   );
// }

// export default CheckBox;
