import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Home from "./Home";
import Images from "./Images";
import Videos from "./Videos";
import Music from "./Music";
import Ads from "./Ads";
import Photography from "./Photography";

export default function App() {
  const [lang, setLang] = useState("en"); // "en" or "zh"

  return (
    <Router>
      <div className="App">
        <Header lang={lang} setLang={setLang} />
        <Hero lang={lang} />
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/images" element={<Images lang={lang} />} />
          <Route path="/videos" element={<Videos lang={lang} />} />
          <Route path="/music" element={<Music lang={lang} />} />
          <Route path="/ads" element={<Ads lang={lang} />} />
          <Route path="/photography" element={<Photography lang={lang} />} />
        </Routes>
        <Portfolio lang={lang} />
      </div>
    </Router>
  );
}