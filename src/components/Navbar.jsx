import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ language, toggleLanguage }) {
  const text = {
    en: { home: "Home", lang: "中文" },
    zh: { home: "首頁", lang: "EN" }
  }[language];

  return (
    <nav className="navbar">
      {/* Return Home button (left) */}
      <Link to="/" className="nav-item">
        {text.home}
      </Link>

      {/* Language toggle (right) */}
      <button className="nav-lang-btn" onClick={toggleLanguage}>
        {text.lang}
      </button>
    </nav>
  );
}