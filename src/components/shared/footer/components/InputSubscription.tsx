"use client";
import { useState, useEffect, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { MdEmail } from "react-icons/md";
import {
  FaEnvelope,
  FaLocationArrow,
  FaPaperPlane,
  FaRegPaperPlane,
  FaSpinner,
} from "react-icons/fa";

export default function InputSubscription() {
  const { t } = useTranslation("Pages_LandingPage");

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSendBtn, setShowSendBtn] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (!isValid) {
      setError(t("errors.invalid_email") || "Invalid email address");
      setIsSubmitting(false);
      setIsLoading(false);
      return;
    }

    try {
      // التأكد من تنفيذ الكود في المتصفح قبل استخدام localStorage
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("yourTokenKey")
          : null;

      // إرسال البيانات إلى API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}web/email-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // تضمين الـ token في الهيدر
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setEmail(""); // إعادة تعيين البريد الإلكتروني
        setShowSendBtn(false); // إخفاء زر الإرسال بعد النجاح
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex relative items-center justify-center"
      >
        <input
          value={email}
          onChange={handleEmailChange}
          type="email"
          placeholder={t("Footer.fourth_column.email.placeholder")}
          autoComplete="on"
          className="light-bg-inputs w-full "
        />
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`bg-custome-yellow rounded-e text-custome-blue text-xl w-14 flex justify-center items-center absolute top-0 right-0 rtl:right-auto rtl:left-0 h-full ${
            isSubmitting ? "opacity-100" : "opacity-60 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : showSendBtn && isValid ? (
            <FaPaperPlane />
          ) : showSendBtn ? (
            <FaRegPaperPlane />
          ) : (
            <FaEnvelope />
          )}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}
