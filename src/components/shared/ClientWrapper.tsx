// ClientWrapper.tsx
"use client"; // هنا نحدد أن هذا الملف هو مكون عميل

import { Store } from "@/Store/Store";
import { Provider } from "react-redux";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={Store}>{children}</Provider>;
}
