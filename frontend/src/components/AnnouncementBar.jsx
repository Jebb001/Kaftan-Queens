import React from "react";
import { SITE } from "../mock";

export default function AnnouncementBar() {
  const items = [...SITE.announcements, ...SITE.announcements];
  return (
    <div className="bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] overflow-hidden">
      <div className="kq-marquee py-2 text-[11px] tracking-[0.22em] uppercase">
        {items.map((t, i) => (
          <span key={i} className="px-8 flex items-center gap-8 whitespace-nowrap">
            {t}
            <span className="opacity-50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
