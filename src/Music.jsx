import React from "react";

export default function Music({ lang }) {
  return (
    <section>
      <h2>{lang === "en" ? "Music" : "音乐"}</h2>
      <div>
        <p>{lang === "en" ? "Sample Music Track" : "示例音乐"}</p>
        <audio controls>
          <source src="/music/sample.mp3" type="audio/mpeg" />
          {lang === "en"
            ? "Your browser does not support the audio element."
            : "您的浏览器不支持音频播放。"}
        </audio>
      </div>
    </section>
  );
}