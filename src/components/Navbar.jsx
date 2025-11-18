import { Link } from "react-router-dom";
import FloatingContact from "./FloatingContact";   // ✅ Add this
import "./Navbar.css";

export default function Navbar({ language, toggleLanguage }) {
  const text = {
    en: { home: "Home", lang: "中文" },
    zh: { home: "首頁", lang: "EN" }
  }[language];

  return (
    <nav className="navbar">
      {/* Left: Home link */}
      <Link to="/" className="nav-item">
        {text.home}
      </Link>

      {/* Right: Contact + Language */}
      <div className="nav-right">
        <FloatingContact />   {/* ✅ Contact button now here */}
        <button className="nav-lang-btn" onClick={toggleLanguage}>
          {text.lang}
        </button>
      </div>
    </nav>
  );
}