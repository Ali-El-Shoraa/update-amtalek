"use clients"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SubmitBtnComponent({
  disabled,
  isLoading,
  value = "Send",
  width = "w-full",
  alignment = "vertical",
  mt = "mt-6",
}: any) {
  return (
    <button
      disabled={disabled}
      className={`light-bg-submit ${alignment === "vertical" ? mt : "md:mt-6"}  ${width}`}
      type="submit"
    >
      {" "}
      {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : value}
    </button>
  );
}

export default SubmitBtnComponent;
