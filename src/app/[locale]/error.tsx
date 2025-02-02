"use client";

export default function Error({ error, reset }: any) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-red-500 text-xl font-bold">حدث خطأ!</h2>
      <p>{error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => reset()} // إعادة تحميل الصفحة
      >
        حاول مرة أخرى
      </button>
    </div>
  );
}
