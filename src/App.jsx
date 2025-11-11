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
  const [lang, setLang] = useState("en");

  return (
    <Router>
      <div className="App">
        <Header lang={lang} setLang={setLang} />
        <Hero lang={lang} />
        <Portfolio lang={lang} />

        <Routes>
          <Route path="/" element={<Home language={lang} />} />
          <Route path="/images" element={<Images language={lang} />} />
          <Route path="/videos" element={<Videos language={lang} />} />
          <Route path="/music" element={<Music language={lang} />} />
          <Route path="/ads" element={<Ads language={lang} />} />
          <Route path="/photography" element={<Photography language={lang} />} />
        </Routes>
      </div>
    </Router>
  );
}