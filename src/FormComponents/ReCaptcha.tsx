import ReCAPTCHA from "react-google-recaptcha";

function ReCaptcha({ refs, onChange, error, ServerError, t }: any) {
  return (
    <div className=" overflow-hidden min-h-[80px]">
      <ReCAPTCHA
        size="normal"
        ref={refs}
        sitekey="6LcDPOkpAAAAAGfjARzfAb3iXloayly0-KIhLLXr" // 6LcDPOkpAAAAAGfjARzfAb3iXloayly0-KIhLLXr
        onChange={onChange}
      />{" "}
      {error && <p className="pt-4 text-xs text-red-500">{t(`validations.ReCAPTCHA.required`)}</p>}
      {ServerError && (
        <p className="pt-2 text-xs text-red-500">
          {
            //!--- server errors --------
            ServerError
          }
        </p>
      )}
    </div>
  );
}

export default ReCaptcha;
