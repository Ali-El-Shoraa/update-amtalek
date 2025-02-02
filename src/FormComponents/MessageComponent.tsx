import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MessageComponent({
  register,
  errors,
  placeholder,
  ServerErrors,
  width,
  rows = "4",
  Bgcolor = "light",
  t,
}: any) {
  return (
    <label
      className={`flex ${width} flex-col items-start justify-center gap-2 relative `}
      htmlFor="message"
    >
      <FontAwesomeIcon
        className=".input__icon w-4  absolute left-3 rtl:left-auto rtl:right-3 top-[13px] opacity-50"
        icon={faCommentDots}
      />

      <textarea
        placeholder={placeholder}
        className={`resize-none placeholder:text-secondary placeholder:opacity-50 placeholder:text-[0.9rem]  py-[0.5rem] px-9 focus:pl-[37.5px] rtl:focus:pr-[37.5px] ${
          Bgcolor === "dark" ? "bg-bg focus:bg-bg focus:shadow-none" : ""
        }`}
        {...register("message", {
          required: true,
          minLength: 3,
        })}
        name="message"
        id="message"
        cols="40"
        rows={rows}
      ></textarea>
      {errors.message && (
        <p className="pt-2 text-xs text-red-500">
          {errors.message.type === "required" &&
            t(`validations.message.required`)}
          {errors.message.type === "minLength" &&
            t(`validations.message.minLength`)}
        </p>
      )}
      {
        //!--- server errors --------
        ServerErrors?.response?.data?.errors?.message && (
          <p className="pt-2 text-xs text-red-500">
            {ServerErrors?.response?.data?.errors?.message?.[0]}
          </p>
        )
      }
    </label>
  );
}

export default MessageComponent;
