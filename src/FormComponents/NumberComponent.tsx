import getData from "@/lib/api/getData";
import { userData } from "@/Store/Features/AuthenticationSlice";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function NumberComponent({
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
  icon,
  t,
}: any) {
  const { listing_number, locale } = useParams<any>();
  const param = useParams<any>();

  const [allData, setAllData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`web/property/${listing_number}`, locale);
        setAllData(data?.data?.[0]?.broker_details?.[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (listing_number) fetchData();
  }, [listing_number, locale]);

  const user = useSelector(userData);
  return (
    <label
      className={` flex ${width}  ${
        alignment === "vertical"
          ? "flex-col gap-2 items-start "
          : "gap-16 items-center md:flex-col md:gap-2 md:items-start"
      } justify-center  relative `}
      htmlFor={name}
    >
      {withIcon && icon === "offer" && (
        <FontAwesomeIcon
          className=".input__icon w-4  absolute left-3 rtl:left-auto rtl:right-3 top-[13px] opacity-50"
          icon={faCommentDollar}
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
          disabled={
            user?.data?.id === allData?.id &&
            user?.data?.actor_type === allData?.broker_type
          }
          dir={dir}
          className={`w-full ${
            withIcon &&
            "pl-9 focus:pl-[37.5px] rtl:pl-0 rtl:pr-9 rtl:focus:pr-[37.5px]"
          } ${
            Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
          }  ${inputStyle}`}
          type="text"
          inputMode="numeric"
          id={name}
          placeholder={placeholder}
          name={name}
          autoComplete="on"
          {...register(`${name}`, {
            required: required,
            pattern: /^[0-9]+$/,
            min: 0,
            ...validations,
          })}
        />
        {/**translations will be t(`${name.required}`) */}
        {errors[name] && (
          <p className="pt-2 text-xs text-red-500">
            {errors[name].type === "required" &&
              t(`validations.${name}.required`)}
            {(errors[name].type === "pattern" || errors[name].type === "min") &&
              t([`validations.${name}.pattern`, `validations.${name}.min`])}
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
      </div>
    </label>
  );
}

export default NumberComponent;
