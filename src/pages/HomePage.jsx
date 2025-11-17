import "../index.css";
import "./HomePage.css";

import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import logoVideo from "../assets/logo-video.mp4";
import heroBg from "../assets/hero-bg.png";

export default function HomePage({ language }) {
  const text = {
    en: {
      title: "Soulrain Studio",
      subtitle: "Creative Media Hub",

      // FINAL HERO MESSAGE (English)
      hero1: "Everyone has a story.",
      hero2: "Soulrain is willing to see it — and to listen.",

      imageBuilding: "Image Building",
      digitalStories: "Digital Stories",
      gallery: "Gallery",
      music: "Music",
      ads: "Ads",

      whyTitle: "Why Soulrain?",
      whyText:
        "Soulrain blends visuals, sound, and story to create work that resonates.",
    },

    zh: {
      title: "雨灵工作室",
      subtitle: "创意媒体中心",

      // FINAL HERO MESSAGE (Chinese, Simplified)
      hero1: "每个人都有故事。",
      hero2: "雨灵愿意看见，也愿意聆听。",

      imageBuilding: "形象塑造",
      digitalStories: "数字故事",
      gallery: "图片集",
      music: "音乐",
      ads: "广告",

      whyTitle: "为什么选择雨灵？",
      whyText:
        "雨灵将视觉、声音与故事融合，创作能够触动人心的作品。",
    },
  };

  const t = text[language];

  return (
    <div className="homepage">

      {/* HERO SECTION */}
      <section className="hero-section">

        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        <div className="hero-overlay" />

        {/* RAIN */}
        <div className="rain">
          {Array.from({ length: 70 }).map((_, i) => (
            <span
              key={i}
              className="raindrop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${0.5 + Math.random() * 0.7}s`,
              }}
            />
          ))}
        </div>

        {/* FOG */}
        <div className="fog fog-top"></div>
        <div className="fog fog-bottom"></div>

        {/* LIGHTNING */}
        <div className="lightning"></div>

        {/* LOGO & TITLES */}
        <video
  className="hero-logo"
  src={logoVideo}
  autoPlay
  loop
  muted
  playsInline
/>
        <h1 className="hero-title">{t.title}</h1>
        <p className="hero-subtitle">{t.subtitle}</p>

        {/* ⭐ FINAL HERO MESSAGE */}
        <div className="hero-message">
          <p>{t.hero1}</p>
          <p>{t.hero2}</p>
        </div>

      </section>

      {/* MAIN BUTTONS */}
      <div className="homepage-buttons">
        <div className="button-row button-row-top">
          <Link to="/videos#image-building" className="homepage-card">
            <div className="icon">🎬</div>
            <h2>{t.imageBuilding}</h2>
          </Link>

          <Link to="/videos#digital-stories" className="homepage-card">
            <div className="icon">📖</div>
            <h2>{t.digitalStories}</h2>
          </Link>
        </div>

        <div className="button-row button-row-bottom">
          <Link to="/images" className="homepage-card">
            <div className="icon">🖼️</div>
            <h2>{t.gallery}</h2>
          </Link>

          <Link to="/music" className="homepage-card">
            <div className="icon">🎵</div>
            <h2>{t.music}</h2>
          </Link>

          <Link to="/ads" className="homepage-card">
            <div className="icon">📺</div>
            <h2>{t.ads}</h2>
          </Link>
        </div>
      </div>

      {/* WHY SOULRAIN SECTION */}
      <section className="why-section">
        <h2 className="why-title">{t.whyTitle}</h2>
        <p className="why-text">{t.whyText}</p>
      </section>
      {/* FOOTER — MUST BE OUTSIDE WHY SECTION */}
<div className="footer">
  <p>@2025 Designed and Built by Soulrain.studio</p>
</div>


    </div>
    
  );
}