import React from "react";

const portfolioItems = [
  { id: 1, type: "video", src: "/videos/sample1.mp4", title_en: "MV Creation", title_zh: "MV制作" },
  { id: 2, type: "video", src: "/videos/sample2.mp4", title_en: "Ad / Logo", title_zh: "广告 / 标志" },
  { id: 3, type: "image", src: "/images/sample1.jpg", title_en: "Photography", title_zh: "摄影作品" },
  // Add more items here
];

export default function Portfolio({ lang }) {
  return (
    <section className="portfolio">
      {portfolioItems.map((item) => (
        <div className="portfolio-card" key={item.id}>
          {item.type === "video" ? (
            <video controls width="320" height="180">
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <img src={item.src} alt={lang === "en" ? item.title_en : item.title_zh} />
          )}
          <h3>{lang === "en" ? item.title_en : item.title_zh}</h3>
        </div>
      ))}
    </section>
  );
}