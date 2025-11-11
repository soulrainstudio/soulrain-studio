import React from "react";

export default function Photography({ language }) {
  return (
    <div>
      <h2>{language === "en" ? "Photography Portfolio" : "摄影作品集"}</h2>
      <p>{language === "en" ? "Showcase your photography works here." : "在此展示您的摄影作品。"}</p>
    </div>
  );
}