import React from "react";

export default function Ads({ language }) {
  return (
    <div>
      <h2>{language === "en" ? "Ads & Logo Portfolio" : "广告与标志作品集"}</h2>
      <p>{language === "en" ? "Display your advertisement and logo designs here." : "在此展示您的广告和标志设计。"}</p>
    </div>
  );
}