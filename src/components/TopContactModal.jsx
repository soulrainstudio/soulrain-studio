import "./TopContactModal.css";

export default function TopContactModal({ onClose }) {
  return (
    <div className="topcontact-backdrop" onClick={onClose}>
      <div
        className="topcontact-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="topcontact-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="topcontact-title">Contact</h2>

        <div className="topcontact-links">
          <a
            href="mailto:thesoulrain@gmail.com"
            className="topcontact-item"
            target="_blank"
          >
            📩 Email
          </a>

          <a
            href="https://youtube.com/@soulrain.studio"
            className="topcontact-item"
            target="_blank"
          >
            ▶️ YouTube
          </a>

          <a
            href="https://instagram.com/soulrain.studio"
            className="topcontact-item"
            target="_blank"
          >
            📸 Instagram
          </a>

          <a
            href="https://www.tiktok.com/@soulrain.studio"
            className="topcontact-item"
            target="_blank"
          >
            🎵 TikTok
          </a>

          <a
            href="https://x.com/soulrainstudio"
            className="topcontact-item"
            target="_blank"
          >
            ✖️ X (Twitter)
          </a>
        </div>
      </div>
    </div>
  );
}