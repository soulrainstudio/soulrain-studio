import React from "react";

export default function Portfolio({ lang }) {
  return (
    <section>
      <h2>{lang === "en" ? "Portfolio Sections" : "作品集"}</h2>
      <ul>
        <li>{lang === "en" ? "Images" : "图片"}</li>
        <li>{lang === "en" ? "Videos" : "视频"}</li>
        <li>{lang === "en" ? "Music" : "音乐"}</li>
        <li>{lang === "en" ? "Ads / Logos" : "广告 / 标志"}</li>
        <li>{lang === "en" ? "Photography" : "摄影"}</li>
      </ul>
    </section>
  );
}