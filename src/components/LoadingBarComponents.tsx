"use client";

import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LoadingBarComponents() {
  const loadingBarRef = useRef<any>(null);
  const router = useRouter();

  let pathname = usePathname();
  let searchParams = useSearchParams();

  const handleStart = () => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }
  };

  const handleComplete = () => {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
  };

  useEffect(() => {
    // استبدال التنقل
    const originalPush = router.push;
    router.push = async (...args: Parameters<typeof router.push>) => {
      handleStart();
      try {
        await originalPush(...args);

        // handleComplete();
      } catch (error) {
        handleComplete();
        throw error;
      }
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  useEffect(() => {
    handleComplete();
  }, [pathname, searchParams]);

  return <LoadingBar color="#29d" ref={loadingBarRef} height={5} />;
}
