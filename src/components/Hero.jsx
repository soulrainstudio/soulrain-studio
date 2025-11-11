import React from "react";

export default function Hero({ lang }) {
  return (
    <section className="hero">
      <video autoPlay loop muted className="hero-video">
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay">
        <h1>{lang === "en" ? "Soulrain Studio" : "雨之魂工作室"}</h1>
        <p>{lang === "en" 
          ? "Your creative portfolio for video, music, ads, and logos" 
          : "您的视频、音乐、广告和标志创意作品集"}</p>
      </div>
    </section>
  );
}