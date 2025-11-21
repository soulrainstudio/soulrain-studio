import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Ads from "./pages/Ads";
import Music from "./pages/Music";
import Videos from "./pages/Videos";
import Images from "./pages/Images";

import {
  videos,
  ads,
  music,
  images,
  allMedia
} from "./mediaIndex";

import GlobalPlayerModal from "./components/GlobalPlayerModal";

// ✅ Import Contact Modal (was missing)
import TopContactModal from "./components/TopContactModal";

export default function App() {
  const [language, setLanguage] = useState("en");
  const [globalPlayerItem, setGlobalPlayerItem] = useState(null);

  // ✅ NEW: Contact modal state
  const [contactOpen, setContactOpen] = useState(false);

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
      
      <Navbar
        language={language}
        toggleLanguage={toggleLanguage}
        setGlobalPlayerItem={setGlobalPlayerItem}
        onContact={() => setContactOpen(true)}   // ✅ FIXED
      />

      {/* ===================== CONTACT MODAL ===================== */}
      {contactOpen && (
        <TopContactModal onClose={() => setContactOpen(false)} />
      )}

      {/* ===================== ROUTES ===================== */}
      <Routes>
        <Route path="/" element={<HomePage language={language} />} />
        <Route path="/ads" element={<Ads language={language} />} />
        <Route path="/music" element={<Music language={language} />} />
        <Route path="/videos" element={<Videos language={language} />} />
        <Route path="/images" element={<Images language={language} />} />
      </Routes>

      {/* ===================== GLOBAL PLAYER (VIDEO/MUSIC) ===================== */}
      {globalPlayerItem && (
        <GlobalPlayerModal
          item={globalPlayerItem}
          onClose={() => setGlobalPlayerItem(null)}
          language={language}
        />
      )}
    </div>
  );
}
