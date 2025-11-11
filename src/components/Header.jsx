import React from "react";

export default function Header({ lang, setLang, setSection }) {
  return (
    <header>
      <button onClick={() => setLang(lang === "en" ? "zh" : "en")}>
        {lang === "en" ? "中文" : "EN"}
      </button>
      <nav>
        <button onClick={() => setSection("home")}>{lang === "en" ? "Home" : "首页"}</button>
        <button onClick={() => setSection("videos")}>{lang === "en" ? "Videos" : "视频"}</button>
        <button onClick={() => setSection("music")}>{lang === "en" ? "Music" : "音乐"}</button>
        <button onClick={() => setSection("ads")}>{lang === "en" ? "Ads / Logos" : "广告 / 标志"}</button>
        <button onClick={() => setSection("photography")}>{lang === "en" ? "Photography" : "摄影"}</button>
      </nav>
    </header>
  );
}