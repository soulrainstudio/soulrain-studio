import React from "react";

function Music({ lang }) {
  return (
    <div>
      <h2>{lang === "en" ? "Music Portfolio" : "音乐作品集"}</h2>
      <p>
        {lang === "en"
          ? "Music compositions and sound designs."
          : "音乐创作和声音设计。"}
      </p>
    </div>
  );
}

export default Music;