import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (index === null || index === undefined) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && images.length > 1) onPrev();
      else if (e.key === "ArrowRight" && images.length > 1) onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onClose, onPrev, onNext]);

  if (index === null || index === undefined) return null;
  const src = images[index];
  const multi = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[80] bg-[hsl(var(--kq-ink))]/95 flex items-center justify-center p-4 sm:p-8 kq-fade-up"
      onClick={onClose}
      data-testid="lightbox"
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-[hsl(var(--kq-bg))]/10 hover:bg-[hsl(var(--kq-bg))]/25 text-[hsl(var(--kq-bg))] flex items-center justify-center transition-colors"
        data-testid="lightbox-close"
      >
        <X className="w-5 h-5" />
      </button>

      {multi && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 w-11 h-11 bg-[hsl(var(--kq-bg))]/10 hover:bg-[hsl(var(--kq-bg))]/25 text-[hsl(var(--kq-bg))] flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 w-11 h-11 bg-[hsl(var(--kq-bg))]/10 hover:bg-[hsl(var(--kq-bg))]/25 text-[hsl(var(--kq-bg))] flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-w-[92vw] max-h-[92vh] object-contain"
      />

      {multi && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.25em] uppercase text-[hsl(var(--kq-bg))]/80">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
