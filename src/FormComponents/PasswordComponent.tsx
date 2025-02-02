import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
function PasswordComponent({
  register,
  name,
  label = "",
  placeholder,
  required = true,
  validations = {},
  errors,
  ServerErrors,
  width = "w-1/2 md:w-full",
  inputStyle,
  dir,
  value,
  Bgcolor = "light",
  alignment = "vertical",
  getValues,
  confirmName,
  confirmName2,
  confirmFor,
  disabled,
  t,
}: any) {
  const [hide, setHide] = useState(false);
  const { i18n } = useTranslation();
  return (
    <label
      className={` flex  bg- ${width} ${
        alignment === "vertical"
          ? "flex-col gap-2 items-start "
          : "gap-6 h-[70px] md:h-auto items-center md:flex-col md:gap-2 md:items-start"
      }  justify-center   `}
      htmlFor={name}
    >
      {label && (
        <h3
          className={`text-lg ${
            alignment === "vertical" ? "min-w-fit " : "min-w-[210px] truncate"
          } `}
        >
          {label}
        </h3>
      )}
      <div className="flex-col items-start  justify-center gap-2 w-full ">
        <div className="w-full relative">
          <input
            disabled={disabled}
            dir={dir}
            className={` ${
              Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
            } w-full ${inputStyle} ${
              disabled && "opacity-50 cursor-not-allowed"
            }`}
            type={`${hide ? "text" : "password"}`}
            id={name}
            placeholder={placeholder}
            name={name}
            autoComplete="on"
            {...register(`${name}`, {
              required: required,

              ...validations,
            })}
          />

          <FontAwesomeIcon
            onClick={() => setHide(!hide)}
            className="absolute right-3 rtl:right-auto rtl:left-3 -translate-y-1/2 top-1/2 h-4 w-4 cursor-pointer"
            icon={hide ? faEyeSlash : faEye}
          />
        </div>

        {errors[name] && (
          <p className="pt-2 text-xs text-red-500">
            {errors[name].type === "required" &&
              t(`validations.${name}.required`)}
            {errors[name].type === "minLength" &&
              t(`validations.${name}.minLength`)}
            {errors[name].type === "validate" &&
              t(`validations.${name}.validate`, { context: confirmFor })}
          </p>
        )}
        {
          //!--- server errors --------
          ServerErrors?.response?.data?.errors &&
            ServerErrors?.response?.data?.errors[name] && (
              <p className="pt-2 text-xs text-red-500">
                {ServerErrors?.response?.data?.errors &&
                  ServerErrors?.response?.data?.errors[name][0]}
              </p>
            )
        }
        {name === "confirm_password" && (
          <div className="w-full mt-2">
            {i18n.language === "ar"
              ? " يجب ان يكون متطابق لكلمة السر"
              : "Must be same as Password"}
          </div>
        )}
      </div>
    </label>
  );
}

export default PasswordComponent;
