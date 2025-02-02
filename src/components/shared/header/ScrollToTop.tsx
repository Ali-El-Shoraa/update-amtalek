"use client";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";

function ScrollToTop() {
  const progress = useRef<any>(null);
  const [showBtn, setShowBtn] = useState(false);
  const scrollPercentage = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      let pos = document.documentElement.scrollTop;
      let calcHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrollValue = Math.round((pos * 100) / calcHeight);

      if (scrollValue !== scrollPercentage.current) {
        scrollPercentage.current = scrollValue;
        progress.current.style.background = `conic-gradient(#bed4de ${scrollValue}%,#edf3f8 ${scrollValue}%)`;
      }

      if (pos > 150 && !showBtn) {
        setShowBtn(true);
      } else if (pos <= 150 && showBtn) {
        setShowBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showBtn]);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <button
      ref={progress}
      onClick={handleScrollToTop}
      className={`${
        showBtn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } group trns fixed right-10 bottom-10  p-1 shadow-lg shadow-secondary/30 w-12 min-w-[48px] h-12 min-h-[48px] flex-center  aspect-square rounded-full z-[1000]`}
    >
      <span className="bg-grey w-full h-full rounded-full flex items-center justify-center">
        <FontAwesomeIcon className="text-xl group-hover:ScrollTo_top_btn" icon={faArrowUp} />
      </span>
    </button>
  );
}

export default ScrollToTop;
