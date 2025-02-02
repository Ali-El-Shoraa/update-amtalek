"use client";
// _app.tsx or _app.js (depending on your setup)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import type { AppProps } from "next/app";

// Create a client
const queryClient = new QueryClient();

function QueryProvider({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Component {...pageProps} /> */}
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;
