import React from "react";

function Home({ lang }) {
  return (
    <div>
      <h2>{lang === "en" ? "Welcome to Soulrain Studio" : "欢迎来到灵雨工作室"}</h2>
      <p>
        {lang === "en"
          ? "Your creative portfolio for video, music, ads, and logos."
          : "您的视频、音乐、广告和标志创意作品集。"}
      </p>
    </div>
  );
}

export default Home;