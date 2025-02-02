import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

function PhoneComponent({
  register,
  name = "phone",
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
  withIcon,
  t,
  disabled = false,
}: any) {
  return (
    <label
      className={`flex ${width}  ${
        alignment === "vertical"
          ? "flex-col gap-2 items-start bg-transparent"
          : "gap-6 h-[70px]  md:h-auto  items-center md:flex-col md:gap-2 md:items-start"
      } justify-center relative`}
      htmlFor={name}
    >
      {withIcon && (
        <FontAwesomeIcon
          className=".input__icon w-4  absolute left-3 rtl:left-auto rtl:right-3 top-3 opacity-50 rtl:flip"
          icon={faPhone}
        />
      )}
      {label && (
        <h3
          className={`text-lg ${
            alignment === "vertical" ? "min-w-fit " : "min-w-[210px] truncate"
          } `}
        >
          {label}
        </h3>
      )}
      <div className="flex-col items-start  justify-center gap-2 w-full">
        <input
          dir={dir}
          disabled={disabled}
          className={`w-full 
            ${withIcon && "pl-9 focus:pl-[37.5px] rtl:pl-0 rtl:pr-9 rtl:focus:pr-[37.5px]"}  ${
            Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
          }
            `}
          type="text"
          inputMode="numeric"
          id={name}
          placeholder={placeholder}
          name={name}
          autoComplete="on"
          {...register(`${name}`, {
            required: required,
            pattern: /^[\d]{11}/,
            maxLength: 11,
            minLength: 11,
            ...validations,
          })}
        />
        {errors[name] && (
          <p className="pt-2 text-xs text-red-500">
            {errors[name].type === "required" && t(`validations.${name}.required`)}
            {errors[name].type === "pattern" && t(`validations.${name}.pattern`)}
            {errors[name].type === "maxLength" && t(`validations.${name}.maxLength`)}
            {errors[name].type === "minLength" && t(`validations.${name}.minLength`)}
          </p>
        )}
        {
          //!--- server errors --------
          ServerErrors?.response?.data?.errors && ServerErrors?.response?.data?.errors[name] && (
            <p className="pt-2 text-xs text-red-500">
              {ServerErrors?.response?.data?.errors &&
                ServerErrors?.response?.data?.errors[name][0]}
            </p>
          )
        }
      </div>
    </label>
  );
}

export default PhoneComponent;
