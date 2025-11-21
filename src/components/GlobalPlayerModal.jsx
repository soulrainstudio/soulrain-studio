import { useEffect, useRef, useState } from "react";
import "./GlobalPlayerModal.css";

export default function GlobalPlayerModal({ item, language, onClose }) {
  if (!item) return null;

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const isVideo = item.isVideo;
  const isAudio = item.isAudio;

  const thumb = item.thumbnail;
  const title = language === "en" ? item.title.en : item.title.zh;

  /* ============ ESC Close ============ */
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* ============ Prevent Behind Scroll ============ */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  /* ============ Auto-play new item ============ */
  useEffect(() => {
    setTimeout(() => {
      if (isVideo && videoRef.current) videoRef.current.play().catch(() => {});
      if (isAudio && audioRef.current) audioRef.current.play().catch(() => {});
    }, 100);
  }, [item, isVideo, isAudio]);

  return (
    <div className="global-player-backdrop" onClick={onClose}>
      <div
        className="global-player-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="global-player-close" onClick={onClose}>
          ✕
        </button>

        <div className="global-player-title">{title}</div>

        {/* ================= VIDEO MODE ================= */}
        {isVideo && (
          <video
            ref={videoRef}
            controls
            className="global-player-media-video"
            poster={thumb || undefined}
          >
            <source src={item.url} />
          </video>
        )}

        {/* ================= AUDIO MODE ================= */}
        {isAudio && (
          <div className="audio-wrapper">

            {/* LARGE THUMBNAIL ABOVE AUDIO CONTROLS */}
            {thumb && (
              <img
                src={thumb}
                alt="thumbnail"
                className="global-player-thumbnail"
              />
            )}

            {/* NATIVE AUDIO CONTROLS (same slider as video) */}
            <audio
              ref={audioRef}
              src={item.url}
              controls
              autoPlay
              style={{ width: "100%", marginTop: "12px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}