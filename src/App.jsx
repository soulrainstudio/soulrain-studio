import React, { useState } from "react";
import Home from "./Home";
import Images from "./Images";
import Videos from "./Videos";
import Music from "./Music";
import Ads from "./Ads";

function App() {
  const [lang, setLang] = useState("en"); // "en" or "zh"

  const toggleLanguage = () => {
    setLang(lang === "en" ? "zh" : "en");
  };

  return (
    <div className="app">
      <header>
        <h1>{lang === "en" ? "Soulrain Studio" : "灵雨工作室"}</h1>
        <nav>
          <a href="#home">{lang === "en" ? "Home" : "主页"}</a>
          <a href="#images">{lang === "en" ? "Images" : "图片"}</a>
          <a href="#videos">{lang === "en" ? "Videos" : "视频"}</a>
          <a href="#music">{lang === "en" ? "Music" : "音乐"}</a>
          <a href="#ads">{lang === "en" ? "Ads" : "广告/标志"}</a>
        </nav>
        <button onClick={toggleLanguage} className="lang-toggle">
          {lang === "en" ? "中文" : "EN"}
        </button>
      </header>

      <main>
        <section id="home">
          <Home lang={lang} />
        </section>
        <section id="images">
          <Images lang={lang} />
        </section>
        <section id="videos">
          <Videos lang={lang} />
        </section>
        <section id="music">
          <Music lang={lang} />
        </section>
        <section id="ads">
          <Ads lang={lang} />
        </section>
      </main>

      <footer>
        <p>
          &copy; {new Date().getFullYear()} {lang === "en" ? "Soulrain Studio" : "灵雨工作室"}
        </p>
      </footer>
    </div>
  );
}

export default App;