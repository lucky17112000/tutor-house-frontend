"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function ScrollIndicator() {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowUp(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const handleUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!showUp ? (
        <button
          type="button"
          onClick={handleDown}
          className="group relative h-12 w-12 rounded-full border border-white/30 bg-white/15 text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/25"
          aria-label="Scroll down"
        >
          <span className="absolute inset-0 rounded-full animate-ping bg-white/15" />
          <ArrowDown className="relative z-10 mx-auto size-5 animate-bounce" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleUp}
          className="group relative h-11 w-11 rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600"
          aria-label="Scroll to top"
        >
          <ArrowUp className="mx-auto size-5" />
        </button>
      )}
    </div>
  );
}
