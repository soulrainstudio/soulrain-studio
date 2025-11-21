import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalPlayerModal from "../components/GlobalPlayerModal";
import "./Videos.css";

/* ---------------------------
   TITLE PARSER (English_Chinese)
--------------------------- */
function parseTitle(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  const parts = base.split("_");

  return {
    en: parts[0] || base,
    zh: parts[1] || "",
  };
}

export default function Videos({ language }) {
  const location = useLocation();
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  const [videosList, setVideosList] = useState([]);
  const [modalItem, setModalItem] = useState(null);

  // determine category
  const category =
    location.hash === "#image-building" ? "image-building" : "digital-stories";

  /* ---------------------------
     LOAD ALL VIDEOS (glob)
--------------------------- */
  const videoFiles = import.meta.glob(
    [
      "/src/assets/videos/digital-stories/*.{mp4,webm,ogg}",
      "/src/assets/videos/image-building/*.{mp4,webm,ogg}",
    ],
    { eager: true, query: "?url", import: "default" }
  );

  const imageFiles = import.meta.glob(
    [
      "/src/assets/videos/digital-stories/*.{png,jpg,jpeg}",
      "/src/assets/videos/image-building/*.{png,jpg,jpeg}",
    ],
    { eager: true, query: "?url", import: "default" }
  );

  useEffect(() => {
    const list = Object.keys(videoFiles)
      .filter((p) => p.includes(`/videos/${category}/`))
      .map((path) => {
        const fileName = path.split("/").pop();
        const baseName = fileName.replace(/\.[^.]+$/, "");
        const parsed = parseTitle(fileName);

        const imageKey = Object.keys(imageFiles).find((k) =>
          k.includes(baseName)
        );

        return {
          baseName,
          fileName,
          title: parsed,
          videoUrl: videoFiles[path],
          imageUrl: imageKey ? imageFiles[imageKey] : null,
        };
      });

    setVideosList(list);
  }, [category]);

  /* ---------------------------
     AUTOPLAY WHEN IN VIEW
--------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (modalItem) return; // pause all inline when modal is open

        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          const vid = videoRefs.current[index];
          if (!vid) return;

          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      {
        threshold: 0.75,
      }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));

    return () => observer.disconnect();
  }, [videosList, modalItem]);

  /* ---------------------------
     TAP → OPEN MODAL
--------------------------- */
  const openModal = (video) => {
    // pause all existing inline videos
    videoRefs.current.forEach((v) => v?.pause());

    setModalItem({
      url: video.videoUrl,
      isVideo: true,
      isAudio: false,
      thumbnail: video.imageUrl,
      title: video.title,
    });
  };

  const closeModal = () => {
    setModalItem(null);
  };

  const t = {
    "digital-stories": language === "en" ? "Digital Stories" : "数字故事",
    "image-building": language === "en" ? "Image Building" : "形象构建",
  };

  return (
    <div className="tiktok-wrapper">
      <h1 className="tiktok-title">{t[category]}</h1>

      {/* TikTok Swipe Container */}
      <div className="tiktok-container" ref={containerRef}>
        {videosList.map((v, i) => (
          <section
            className="tiktok-video-panel"
            key={v.baseName}
            onClick={() => openModal(v)} // tap → modal
          >
            {/* Bilingual Title */}
            <div className="tiktok-video-title">
              {language === "en" ? v.title.en : v.title.zh || v.title.en}
            </div>

            {/* Inline Video */}
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              data-index={i}
              className="tiktok-video"
              src={v.videoUrl}
              playsInline
              muted
              preload="auto"
            />

            {/* THUMBNAIL fallback */}
            {v.imageUrl && (
              <img className="tiktok-poster" src={v.imageUrl} alt={v.title.en} />
            )}
          </section>
        ))}
      </div>

      {/* Global Modal */}
      <GlobalPlayerModal
        item={modalItem}
        language={language}
        onClose={closeModal}
      />
    </div>
  );
}