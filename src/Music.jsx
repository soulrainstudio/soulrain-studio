import React from "react";

export default function Music({ language }) {
  return (
    <div>
      <h2>{language === "en" ? "Music Portfolio" : "音乐作品集"}</h2>
      <p>{language === "en" ? "Display your songs or audio projects here." : "在此展示您的音乐或音频作品。"}</p>
    </div>
  );
}