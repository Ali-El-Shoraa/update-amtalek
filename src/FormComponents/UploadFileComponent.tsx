import { faArrowUpFromBracket, faImage, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useEffect } from "react";

function UploadFileComponent({
  register,
  name,
  label = "",
  required = true,
  validations = {},
  errors,
  ServerErrors = {},
  width = "w-1/2 md:w-full",
  inputStyle,
  t,
  Bgcolor = "light",
  btnText,
  watch,
  serverFileSrc,
  fileFor,
  primarySubmit,
}: any) {
  const [uploadedFileSrc, setUploadedFileSrc] = useState<any>(null);
  useEffect(() => {
    const subscription = watch((input: any) => {
      if (input?.[name]?.[0]?.name?.length > 0) {
        let imageUrl = URL.createObjectURL(input?.[name]?.[0]);
        setUploadedFileSrc(imageUrl);
      }
    });

    return () => {
      subscription.unsubscribe();
      //! also revoke if the for has submitted successfully
      URL.revokeObjectURL(uploadedFileSrc);
    };
  }, [name, uploadedFileSrc, watch]);

  return (
    <>
      <label
        className={` flex w-fit max-w-max  flex-col items-start text-lg justify-center gap-2 ${width} `}
        htmlFor={!primarySubmit ? name : ""}
      >
        <h4>{label} </h4>
        <label
          htmlFor={primarySubmit ? name : ""}
          className={`relative aspect-square overflow-hidde bg-grey flex justify-center items-center trns cursor-pointer ${
            fileFor === "property"
              ? "round w-40"
              : fileFor === "user"
              ? "rounded-full p-1 border-2 border-secondary w-40"
              : fileFor === "company_logo"
              ? "round w-24"
              : fileFor === "user_register"
              ? "rounded-full p-1 border-2 border-secondary w-24"
              : ""
          } ${uploadedFileSrc ? " border-opacity-100" : "border-opacity-50"}`}
        >
          {uploadedFileSrc && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setUploadedFileSrc(null);
              }}
              className="absolute w-5 h-5 rounded-full bg-secondary text-white -right-6 top-0 flex items-center justify-center z-50"
            >
              x
            </button>
          )}
          {serverFileSrc || uploadedFileSrc ? (
            <Image
              width={1000}
              height={1000}
              className={`w-full  h-full ${required ? "object-fill" : "object-cover"}  ${
                fileFor === "user" || fileFor === "user_register" ? "rounded-full" : ""
              }`}
              src={uploadedFileSrc || serverFileSrc}
              alt="da"
            />
          ) : (
            <FontAwesomeIcon
              className={`${fileFor === "user_register" ? "text-6xl " : "text-8xl "} opacity-50`}
              icon={fileFor === "user" || fileFor === "user_register" ? faUser : faImage}
            />
          )}
        </label>
        <div
          className={`${
            fileFor === "property"
              ? " w-40"
              : fileFor === "user"
              ? " w-40"
              : fileFor === "company_logo"
              ? " w-24"
              : fileFor === "user_register"
              ? " w-24"
              : ""
          }   h-9 cursor-pointer flex justify-center items-center  overflow-hidden border-2 border-secondary round relative bg-secondary text-bg trns hover:bg-bg hover:text-secondary active:scale-90  mt-2`}
        >
          <input
            className={`  w-full  opacity-0 !h-9 cursor-pointer`}
            type="file"
            id={name}
            name={name}
            accept="image/jpg, image/jpeg, image/png, image/webp"
            {...register(`${name}`, {
              required: required,
              validate: (value: any) => value && !(value[0]?.size > 6000000),
            })}
          />
          <div
            className="absolute left-0 top-0 text-base flex justify-center items-center gap-2 h-full w-full pointer-events-none "
            //type="button"
          >
            <FontAwesomeIcon icon={faArrowUpFromBracket} /> {btnText}
          </div>
        </div>
        {errors[name] && (
          <p
            className={`pt-2  text-red-500 ${
              fileFor === "property"
                ? " text-xs"
                : fileFor === "user"
                ? " text-xs"
                : fileFor === "company_logo"
                ? " text-[9px]"
                : fileFor === "user_register"
                ? " text-[9px]"
                : ""
            } `}
          >
            {errors[name].type === "required" && t(`validations.${name}.required`)}

            {errors[name].type === "validate" && t(`validations.${name}.validate`)}
          </p>
        )}
        {
          //!--- server errors --------
          ServerErrors?.response?.data?.errors && ServerErrors?.response?.data?.errors[name] && (
            <p className="pt-2 text-xs text-red-500">
              {ServerErrors?.response?.data?.errors[name][0]}
            </p>
          )
        }
      </label>
    </>
  );
}

export default UploadFileComponent;
