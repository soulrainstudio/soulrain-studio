import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";

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