import React from "react";
import { Link } from "react-router-dom";

export default function Header({ lang, setLang }) {
  return (
    <header>
      <nav>
        <Link to="/">{lang === "en" ? "Home" : "主页"}</Link> | 
        <Link to="/images">{lang === "en" ? "Images" : "图片"}</Link> | 
        <Link to="/videos">{lang === "en" ? "Videos" : "视频"}</Link> | 
        <Link to="/music">{lang === "en" ? "Music" : "音乐"}</Link> | 
        <Link to="/ads">{lang === "en" ? "Ads/Logo" : "广告/标志"}</Link> | 
        <Link to="/photography">{lang === "en" ? "Photography" : "摄影"}</Link>
      </nav>
      <button onClick={() => setLang(lang === "en" ? "zh" : "en")}>
        {lang === "en" ? "中文" : "English"}
      </button>
    </header>
  );
}