import React from "react";

export default function Hero({ lang }) {
  return (
    <section>
      <h1>{lang === "en" ? "Soulrain Studio" : "Soulrain 工作室"}</h1>
      <p>{lang === "en" ? "Your creative portfolio for videos, music, ads, and photography." : "您的视频、音乐、广告和摄影创意作品集。"}</p>
    </section>
  );
}