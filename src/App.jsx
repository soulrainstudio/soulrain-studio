import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Photography from "./Photography";

<Routes>
  <Route path="/" element={<Home language={language} />} />
  <Route path="/images" element={<Images language={language} />} />
  <Route path="/videos" element={<Videos language={language} />} />
  <Route path="/music" element={<Music language={language} />} />
  <Route path="/ads" element={<Ads language={language} />} />
  <Route path="/photography" element={<Photography language={language} />} />
</Routes>

export default function App() {
  const [lang, setLang] = useState("en"); // "en" or "zh"

  return (
    <div className="App">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Portfolio lang={lang} />
    </div>
  );
}