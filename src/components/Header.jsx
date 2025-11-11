import React from "react";
import LanguageToggle from "./LanguageToggle";

export default function Header({ lang, setLang }) {
  return (
    <header className="header">
      <div className="logo">{lang === "en" ? "Soulrain Studio" : "雨之魂工作室"}</div>
      <nav>
        <a href="#videos">{lang === "en" ? "Videos" : "视频"}</a>
        <a href="#images">{lang === "en" ? "Images" : "图片"}</a>
        <a href="#music">{lang === "en" ? "Music" : "音乐"}</a>
        <a href="#ads">{lang === "en" ? "Ads/Logo" : "广告/标志"}</a>
      </nav>
      <LanguageToggle lang={lang} setLang={setLang} />
    </header>
  );
}