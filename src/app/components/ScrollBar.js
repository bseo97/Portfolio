"use client";
import React, { useEffect, useState, useRef } from "react";

export default function Scrollbar() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      setScrollPercent(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollbarDrag = (e) => {
    const scrollbarHeight = scrollbarRef.current.offsetHeight;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const clickY = e.clientY;

    // Calculate the new scroll position
    const newScrollPosition = (clickY / scrollbarHeight) * pageHeight;
    window.scrollTo({ top: newScrollPosition, behavior: "auto" });
  };

  return (
    <div>
      {/* Scrollbar */}
      <div
        className="fixed top-0 right-0 h-full w-4 bg-gray-200 z-50"
        onClick={handleScrollbarDrag}
      >
        {/* Scroll Indicator */}
        <div
          ref={scrollbarRef}
          className="bg-blue-500 w-full rounded-md"
          style={{
            height: `${Math.max(scrollPercent, 5)}%`, // Minimum height for visibility
            transform: `translateY(${scrollPercent}%)`,
          }}
        />
      </div>
    </div>
  );
}
