import { useState } from "react";
import "./Images.css";

const imageModules = import.meta.glob("/src/assets/images/*.{jpg,png,jpeg}", {
  eager: true,
});

const toURL = (m) => (typeof m === "string" ? m : m?.default);

const images = Object.keys(imageModules).map((path) => {
  const file = path.split("/").pop();
  const name = file.replace(/\.[^.]+$/, "");
  return { name, src: toURL(imageModules[path]) };
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

      {!selected && (
        <div className="images-grid">
          {images.map((img, index) => (
            <button
              key={index}
              className="image-item"
              onClick={() => setSelected(img)}
            >
              <img src={img.src} alt={img.name} className="image-thumb" />
              <span className="image-title">{img.name}</span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="full-image-container">
          <button className="back-btn" onClick={() => setSelected(null)}>
            ✕
          </button>

          <img src={selected.src} alt={selected.name} className="full-image" />
          <div className="full-image-title">{selected.name}</div>
        </div>
      )}
    </div>
  );
}
