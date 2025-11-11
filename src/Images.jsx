import React from "react";

export default function Images({ language }) {
  return (
    <div>
      <h2>{language === "en" ? "Images Portfolio" : "图片作品集"}</h2>
      <p>{language === "en" ? "Display your image projects here." : "在此展示您的图片作品。"}</p>
    </div>
  );
}