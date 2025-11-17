import { useState } from "react";
import "./FloatingContact.css";
import wechatQR from "../assets/wechat-qr.jpg";

export default function FloatingContact({ language }) {
  const [open, setOpen] = useState(false);

  // If language is not passed, default to English
  const label = language === "zh" ? "联系" : "Contact";

  return (
    <div className="floating-contact-wrapper">
      {/* Pill-shaped button with text */}
      <button
        type="button"
        className="floating-contact"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="contact-icon">💬</span>
        <span className="contact-text">{label}</span>
      </button>

      {/* Panel opens/closes by state, not hover */}
      <div className={`contact-panel ${open ? "open" : ""}`}>
        {/* Email (Gmail compose) */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=thesoulrain@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <span className="icon">📩</span>
          <span>Email</span>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com/@soulrain.studio"
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <span className="icon">▶️</span>
          <span>YouTube</span>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/soulrain.studio"
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <span className="icon">📸</span>
          <span>Instagram</span>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@soulrain.studio"
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <span className="icon">🎵</span>
          <span>TikTok</span>
        </a>

        {/* X */}
        <a
          href="https://x.com/soulrainstudio"
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <span className="icon">✖️</span>
          <span>X</span>
        </a>

        {/* WeChat with QR code */}
        <div className="contact-item qr-item">
          <div className="qr-header">
            <span className="icon">🟩</span>
            <span>WeChat: windrain911</span>
          </div>
          <img src={wechatQR} alt="WeChat QR" className="qr-image" />
        </div>
      </div>
    </div>
  );
}