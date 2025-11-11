import React from "react";

function Images({ lang }) {
  return (
    <div>
      <h2>{lang === "en" ? "Image Portfolio" : "图片作品集"}</h2>
      <p>
        {lang === "en"
          ? "Showcase of personal and company images."
          : "展示个人和公司图片。"}
      </p>
    </div>
  );
}

export default Images;