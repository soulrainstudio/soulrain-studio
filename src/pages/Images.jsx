import { useState } from "react";
import "./Images.css";

/* ---------------------------
   TITLE PARSER (English_Chinese)
   Example:  Genghis_成吉思汗.jpg
--------------------------- */
function parseTitle(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  const parts = base.split("_");
  return {
    en: parts[0] || base,
    zh: parts[1] || "",
  };
}

const imageModules = import.meta.glob("/src/assets/images/*.{jpg,png,jpeg}", {
  eager: true,
});

const toURL = (m) => (typeof m === "string" ? m : m?.default);

/* Convert imported images into objects with bilingual titles */
const images = Object.keys(imageModules).map((path) => {
  const file = path.split("/").pop();
  return {
    file,
    title: parseTitle(file),
    src: toURL(imageModules[path]),
  };
});

export default function Images({ language }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="images-wrapper">
      <h1 className="text-3xl font-bold text-center mb-3">
        {language === "en" ? "Images" : "图片集"}
      </h1>

      <div className="page-description">
        {language === "en"
          ? "Capture moments, revive old photos, enhance visuals, and shape brand identity."
          : "记录瞬间、复活旧照、强化视觉，并塑造品牌识别。"}
      </div>

      {/* ---------- GRID ---------- */}
      {!selected && (
        <div className="images-grid">
          {images.map((img, index) => (
            <button
              key={index}
              className="image-item"
              onClick={() => setSelected(img)}
            >
              <img src={img.src} alt={img.title.en} className="image-thumb" />

              {/* BILINGUAL TITLE */}
              <span className="image-title">
                {language === "en"
                  ? img.title.en
                  : img.title.zh || img.title.en}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ---------- FULL IMAGE VIEWER ---------- */}
      {selected && (
        <div className="full-image-container">
          <button className="back-btn" onClick={() => setSelected(null)}>
            ✕
          </button>

          <img
            src={selected.src}
            alt={selected.title.en}
            className="full-image"
          />

          {/* BILINGUAL TITLE */}
          <div className="full-image-title">
            {language === "en"
              ? selected.title.en
              : selected.title.zh || selected.title.en}
          </div>
        </div>
      )}
    </div>
  );
}

