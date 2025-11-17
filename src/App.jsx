import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Ads from "./pages/Ads";
import Music from "./pages/Music";
import Videos from "./pages/Videos";
import Images from "./pages/Images";
import { useState, useEffect } from "react";
import FloatingContact from "./components/FloatingContact";

export default function App() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "zh" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar language={language} toggleLanguage={toggleLanguage} />

      {/* ⭐ Floating Contact Button — appears on every page */}
      <FloatingContact />

      <Routes>
        <Route path="/" element={<HomePage language={language} />} />
        <Route path="/ads" element={<Ads language={language} />} />
        <Route path="/music" element={<Music language={language} />} />
        <Route path="/videos" element={<Videos language={language} />} />
        <Route path="/images" element={<Images language={language} />} />
      </Routes>
    </div>
  );
}