import { useState, useEffect } from "react";
import "./Navbar.css";
import { allMedia } from "../mediaIndex";

export default function Navbar({
  language,
  toggleLanguage,
  setGlobalPlayerItem,
  onContact,      // <-- RESTORED
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  /* -------------------------------
     Handle search typing
  -------------------------------- */
  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const lower = value.toLowerCase();

    const filtered = allMedia.filter((item) => {
      const en = item.title.en.toLowerCase();
      const zh = item.title.zh.toLowerCase();
      return en.includes(lower) || zh.includes(lower);
    });

    setResults(filtered);
  };

  /* -------------------------------
     Click search result → open modal
  -------------------------------- */
  const openItem = (item) => {
    setGlobalPlayerItem(item);
    setQuery("");
    setResults([]);
  };

  /* -------------------------------
     Close dropdown on scroll
  -------------------------------- */
  useEffect(() => {
    const close = () => setResults([]);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <nav className="navbar">

      {/* LEFT — HOME */}
      <div className="nav-left">
        <a href="/" className="nav-home">Home</a>
      </div>

      {/* CENTER — SEARCH */}
      <div className="search-container">
        <input
          type="text"
          value={query}
          placeholder={language === "en" ? "Search..." : "搜索..."}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />

        {results.length > 0 && (
          <div className="search-dropdown">
            {results.map((item) => (
              <button
                key={item.id}
                className="search-result-item"
                onClick={() => openItem(item)}
              >
                <img
                  src={item.thumbnail}
                  className="search-thumb"
                  alt=""
                />

                <div className="search-texts">
                  <div className="search-title-main">
                    {language === "en" ? item.title.en : item.title.zh}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT — CONTACT + LANGUAGE TOGGLE */}
      <div className="nav-right">
        <button
          className="contact-btn"
          onClick={() => {
            if (onContact) onContact();  // <-- FIXED
          }}
        >
          {language === "en" ? "Contact" : "联系"}
        </button>

        <button className="lang-btn" onClick={toggleLanguage}>
          {language === "en" ? "中文" : "EN"}
        </button>
      </div>

    </nav>
  );
}