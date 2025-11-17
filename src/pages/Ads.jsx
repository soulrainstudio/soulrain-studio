import { useState } from "react";
import "./Ads.css";

const videoModules = import.meta.glob("/src/assets/ads/*.{mp4,webm}", { eager: true });
const imageModules = import.meta.glob("/src/assets/ads/*.{jpg,jpeg,png,gif}", { eager: true });

const videos = Object.keys(videoModules).map(path => {
  const baseName = path.split("/").pop().replace(/\.[^.]+$/, "");
  return {
    name: baseName,
    src: videoModules[path].default,
    type: "video"
  };
});

const images = Object.keys(imageModules).map(path => {
  const baseName = path.split("/").pop().replace(/\.[^.]+$/, "");
  return {
    name: baseName,
    src: imageModules[path].default,
    type: "image"
  };
});

const ads = [...videos, ...images];

export default function Ads({ language }) {
  const [currentAd, setCurrentAd] = useState(null);

  return (
    <div className="ads-page p-8">
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        {language === "en" ? "Ads" : "广告"}
      </h1>

      {/* Page Description */}
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
            {ad.type === "video" ? (
              <video
                src={ad.src}
                className="ads-thumb-media"
                muted
                preload="metadata"
              />
            ) : (
              <img src={ad.src} alt={ad.name} className="ads-thumb-media" />
            )}
            <span className="ads-thumb-title mt-2 text-white text-center">{ad.name}</span>
          </button>
        ))}
      </div>

      {/* Player */}
      {currentAd && (
        <div className="ads-player-overlay">
          <button className="ads-close-btn" onClick={() => setCurrentAd(null)}>✕</button>

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