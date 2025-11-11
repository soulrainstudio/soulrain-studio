import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Videos from "./Videos";
import Music from "./Music";
import Ads from "./Ads";
import Photography from "./Photography";

export default function App() {
  const [lang, setLang] = useState("en"); // "en" or "zh"
  const [section, setSection] = useState("home"); // "home", "videos", "music", "ads", "photography"

  return (
    <div className="App">
      <Header lang={lang} setLang={setLang} setSection={setSection} />
      <Hero lang={lang} />
      {section === "home" && <Portfolio lang={lang} setSection={setSection} />}
      {section === "videos" && <Videos lang={lang} />}
      {section === "music" && <Music lang={lang} />}
      {section === "ads" && <Ads lang={lang} />}
      {section === "photography" && <Photography lang={lang} />}
    </div>
  );
}