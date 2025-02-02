import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//!until now the form components cannot be used with icons and labels (horizontal or vertical)

function EmailComponent({
  register,
  name = "email",
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
          ? "flex-col gap-2 items-start bg-"
          : "gap-6 h-[70px]  md:h-auto  items-center md:flex-col md:gap-2 md:items-start"
      } justify-center relative `}
      htmlFor={name}
    >
      {withIcon && (
        <FontAwesomeIcon
          className=".input__icon w-4  absolute left-3 rtl:left-auto rtl:right-3 top-[13px] opacity-50"
          icon={faEnvelope}
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
            withIcon && "pl-9 focus:pl-[37.5px] rtl:pl-0 rtl:pr-9 rtl:focus:pr-[37.5px] "
          }  ${Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"}`}
          type="text"
          id={name}
          placeholder={placeholder}
          name={name}
          autoComplete="on"
          {...register(`${name}`, {
            required: required,
            pattern: /^[A-z][A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            ...validations,
          })}
        />

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

export default EmailComponent;
