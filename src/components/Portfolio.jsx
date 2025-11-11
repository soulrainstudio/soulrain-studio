import React from "react";

export default function Portfolio({ lang, setSection }) {
  return (
    <section>
      <h2>{lang === "en" ? "Our Works" : "我们的作品"}</h2>
      <div>
        <button onClick={() => setSection("videos")}>{lang === "en" ? "Videos" : "视频"}</button>
        <button onClick={() => setSection("music")}>{lang === "en" ? "Music" : "音乐"}</button>
        <button onClick={() => setSection("ads")}>{lang === "en" ? "Ads / Logos" : "广告 / 标志"}</button>
        <button onClick={() => setSection("photography")}>{lang === "en" ? "Photography" : "摄影"}</button>
      </div>
    </section>
  );
}