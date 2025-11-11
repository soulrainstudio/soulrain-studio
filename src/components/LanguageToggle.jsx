import React from "react";

export default function LanguageToggle({ lang, setLang }) {
  return (
    <div className="language-toggle">
      <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>EN</button>
      <button onClick={() => setLang("zh")} className={lang === "zh" ? "active" : ""}>中文</button>
    </div>
  );
}