import React from "react";

export default function Videos({ language }) {
  return (
    <div>
      <h2>{language === "en" ? "Videos Portfolio" : "视频作品集"}</h2>
      <p>{language === "en" ? "Display your videos here." : "在此展示您的视频作品。"}</p>
    </div>
  );
}