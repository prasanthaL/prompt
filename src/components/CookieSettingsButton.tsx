"use client";

import React from "react";

export default function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("open-cookie-banner"));
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className={
        className ||
        "text-[13px] text-white/45 hover:text-white transition-colors py-0.5 text-left cursor-pointer"
      }
    >
      Cookie settings
    </button>
  );
}
