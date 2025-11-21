import { useState } from "react";
import "./Ads.css";

/* ---------------------------
   TITLE PARSER (English_Chinese)
   Example:  Genghis_成吉思汗.mp4
--------------------------- */
function parseTitle(filename) {
  const name = filename.replace(/\.[^.]+$/, "");
  const parts = name.split("_");

  return {
    en: parts[0] || name,
    zh: parts[1] || "",
  };
}

/* Load all ads files */
const videoModules = import.meta.glob("/src/assets/ads/*.{mp4,webm}", { eager: true });
const imageModules = import.meta.glob("/src/assets/ads/*.{jpg,jpeg,png,gif}", { eager: true });

/* Convert video list */
const videos = Object.keys(videoModules).map((path) => {
  const file = path.split("/").pop();
  const baseName = file.replace(/\.[^.]+$/, "");
  return {
    title: parseTitle(file),   // ⬅ added
    name: baseName,
    src: videoModules[path].default || videoModules[path],
    type: "video",
    thumbnail: null,
    file,
  };
});

/* Convert image list */
const images = Object.keys(imageModules).map((path) => {
  const file = path.split("/").pop();
  const baseName = file.replace(/\.[^.]+$/, "");
  return {
    title: parseTitle(file),   // ⬅ added
    name: baseName,
    src: imageModules[path].default || imageModules[path],
    type: "image",
    file,
  };
});

/* MATCH thumbnails to videos */
videos.forEach((vid) => {
  const thumb = images.find((img) => img.name === vid.name);
  if (thumb) vid.thumbnail = thumb.src;
});

/* Unified final list */
const ads = [
  ...videos,
  ...images.filter((img) => !videos.some((v) => v.name === img.name)),
];

export default function Ads({ language }) {
  const [currentAd, setCurrentAd] = useState(null);

  return (
    <div className="ads-page p-8">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        {language === "en" ? "Ads" : "广告"}
      </h1>

      {/* Description */}
      <div className="page-description">
        {language === "en"
          ? "Ad films that shape emotion and brand perception, giving your message vivid depth."
          : "用影像塑造情绪与品牌认知，让您的广告生动深刻。"}
      </div>

      {/* Thumbnails */}
      <div className="ads-thumbnails grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">

        {ads.map((ad, idx) => (
          <button
            key={idx}
            className="ads-thumb-btn flex flex-col items-center"
            onClick={() => setCurrentAd(ad)}
          >

            {/* Always use <img> for mobile */}
            <img
              src={ad.thumbnail ? ad.thumbnail : ad.src}
              alt={ad.name}
              className="ads-thumb-media"
            />

            {/* ⬅ Bilingual Title */}
            <span className="ads-thumb-title mt-2 text-white text-center">
              {language === "en"
                ? ad.title.en
                : ad.title.zh || ad.title.en}
            </span>
          </button>
        ))}
      </div>

      {/* Player Overlay */}
      {currentAd && (
        <div className="ads-player-overlay">
          <button className="ads-close-btn" onClick={() => setCurrentAd(null)}>
            ✕
          </button>

          {currentAd.type === "video" ? (
            <video
              key={currentAd.src}
              src={currentAd.src}
              controls
              autoPlay
              className="ads-full-media"
            />
          ) : (
            <img
              key={currentAd.src}
              src={currentAd.src}
              className="ads-full-media"
            />
          )}
        </div>
      )}
    </div>
  );
}