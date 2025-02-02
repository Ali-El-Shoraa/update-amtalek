import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function TextComponent({
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
  withIcon,
  t,
  disabled = false,
  loc,
}: any) {
  const { i18n } = useTranslation();
  return (
    <label
      className={` flex  bg- ${width} ${
        alignment === "vertical"
          ? "flex-col gap-2 items-start "
          : "gap-6 h-[70px] md:h-auto items-center md:flex-col md:gap-2 md:items-start"
      }  justify-center relative  `}
      htmlFor={name}
    >
      {withIcon && (
        <FontAwesomeIcon
          className=".input__icon w-4  absolute left-3 rtl:left-auto rtl:right-3 top-[13px] opacity-50"
          icon={faUser}
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
      <div className="flex-col items-start  justify-center gap-2 w-full ">
        <input
          dir={dir}
          disabled={disabled}
          className={`w-full ${
            withIcon && "pl-9 focus:pl-[37.5px] rtl:pl-0 rtl:pr-9 rtl:focus:pr-[37.5px]"
          }  ${Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"}  ${inputStyle}`}
          type="text"
          id={name}
          placeholder={placeholder}
          name={name}
          autoComplete="on"
          {...register(`${name}`, {
            required: required,
            ...validations,
          })}
        />
        {loc && (
          <div className="text-sm mt-1">
            {i18n.language === "ar"
              ? "ملاحظة: يرجى الانتقال إلى  Google Maps والحصول على رابط التضمين"
              : "Note: Please go to Google Maps and get the embed link"}
          </div>
        )}
        {/**translations will be t(`${name.required}`) */}
        {errors[name] && (
          <p className="pt-2 text-xs text-red-500">
            {errors[name].type === "required" && t(`validations.${name}.required`)}
            {errors[name].type === "pattern" && t(`validations.${name}.pattern`)}
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

export default TextComponent;
