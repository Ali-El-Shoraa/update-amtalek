function ErrorMessage({ h, message }: any) {
  return (
    <section
      className={`w-full ${
        h === "screen" ? "h-[calc(100vh-136px)]" : "h-full"
      } flex justify-center items-center`}
    >
      <p>{message}</p>
    </section>
  );
}

export default ErrorMessage;
