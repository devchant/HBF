"use client";

import { useEffect, useState } from "react";
import type { GalleryPhoto } from "@/lib/cms";

export function GalleryWall({ photos }: { photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, photos.length]);

  if (photos.length === 0) return null;
  const current = open !== null ? photos[open] : null;

  return (
    <>
      <div className="gallery-wall">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className="gallery-item"
            onClick={() => setOpen(index)}
          >
            <img src={photo.imageUrl} alt={photo.alt} />
            {photo.caption ? <span>{photo.caption}</span> : null}
          </button>
        ))}
      </div>

      {current ? (
        <div className="gallery-lightbox" role="presentation" onClick={() => setOpen(null)}>
          <div
            className="gallery-lightbox-card"
            role="dialog"
            aria-modal="true"
            aria-label={current.caption || current.alt}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="gallery-lightbox-close" onClick={() => setOpen(null)} aria-label="Close">
              ×
            </button>
            <img src={current.imageUrl} alt={current.alt} />
            {current.caption ? <p>{current.caption}</p> : null}
            {photos.length > 1 ? (
              <div className="gallery-lightbox-nav">
                <button
                  type="button"
                  onClick={() => setOpen((open! - 1 + photos.length) % photos.length)}
                >
                  Previous
                </button>
                <span>
                  {open! + 1} / {photos.length}
                </span>
                <button type="button" onClick={() => setOpen((open! + 1) % photos.length)}>
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
