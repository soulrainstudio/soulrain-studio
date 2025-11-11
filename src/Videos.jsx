import React from "react";

function Videos({ lang }) {
  return (
    <div>
      <h2>{lang === "en" ? "Video Portfolio" : "视频作品集"}</h2>
      <p>
        {lang === "en"
          ? "Virtual stories and MV creations."
          : "虚拟故事和音乐视频创作。"}
      </p>
    </div>
  );
}

export default Videos;