import React from "react";

export default function Hero({ lang }) {
  return (
    <section>
      <h1>{lang === "en" ? "Soulrain Studio" : "灵雨工作室"}</h1>
      <p>{lang === "en" ? "Creative portfolio for video, music, ads, and logos" : "视频、音乐、广告与标志创意作品集"}</p>
    </section>
  );
}