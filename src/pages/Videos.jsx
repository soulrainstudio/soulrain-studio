import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Videos({ language }) {
  const location = useLocation();
  const videoRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [thumbnails, setThumbnails] = useState({});

  // detect category from hash
  const category =
    location.hash === "#image-building" ? "image-building" : "digital-stories";

  // Load videos by category
  const videoFiles = import.meta.glob(
    [
      "/src/assets/videos/digital-stories/*.{mp4,webm,ogg}",
      "/src/assets/videos/image-building/*.{mp4,webm,ogg}",
    ],
    { eager: true, query: "?url", import: "default" }
  );

  // Load thumbnails
  const imageFiles = import.meta.glob(
    [
      "/src/assets/videos/digital-stories/*.{png,jpg,jpeg}",
      "/src/assets/videos/image-building/*.{png,jpg,jpeg}",
    ],
    { eager: true, query: "?url", import: "default" }
  );

  const videos = Object.keys(videoFiles)
    .filter((p) => p.includes(`/videos/${category}/`))
    .map((path) => {
      const fileName = path.split("/").pop();
      const baseName = fileName.replace(/\.[^.]+$/, "");

      const imageMatchKey = Object.keys(imageFiles).find((k) =>
        k.includes(baseName)
      );

      return {
        title: baseName,
        videoUrl: videoFiles[path],
        imageUrl: imageMatchKey ? imageFiles[imageMatchKey] : null,
      };
    });

  // Auto-generate thumbnails
  useEffect(() => {
    videos.forEach((v) => {
      if (!v.imageUrl && !thumbnails[v.title]) {
        const vid = document.createElement("video");
        vid.src = v.videoUrl;
        vid.crossOrigin = "anonymous";

        vid.addEventListener("loadedmetadata", () => {
          vid.currentTime = 0.1;
        });

        vid.addEventListener("timeupdate", () => {
          const canvas = document.createElement("canvas");
          canvas.width = vid.videoWidth;
          canvas.height = vid.videoHeight;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);

          setThumbnails((prev) => ({
            ...prev,
            [v.title]: canvas.toDataURL("image/jpeg"),
          }));

          vid.remove();
        });
      }
    });
  }, [category]);

  const openVideo = (video) => {
    setCurrentVideo(video);
    setTimeout(() => videoRef.current?.play(), 200);
  };

  const closeVideo = () => {
    videoRef.current?.pause();
    setCurrentVideo(null);
  };

  const t = {
    "digital-stories": language === "en" ? "Digital Stories" : "数字故事",
    "image-building": language === "en" ? "Image Building" : "形象构建",
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-3">
        {t[category]}
      </h1>

      {/* PAGE DESCRIPTION */}
      <div className="page-description">
        {category === "image-building"
          ? language === "en"
            ? "Films that strengthen brand identity and present you or your business with clarity and confidence."
            : "以影像强化品牌认同，并让个人与企业形象清晰、自信。"
          : language === "en"
          ? "Cinematic clips that bring small stories to life."
          : "以电影化片段，让小故事活起来。"}
      </div>

      {/* VIDEO GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {videos.map((v) => (
          <button
            key={v.title}
            onClick={() => openVideo(v)}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
              <img
                src={v.imageUrl || thumbnails[v.title]}
                alt={v.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-4xl text-white drop-shadow-lg">▶</span>
              </div>
            </div>

            <div className="mt-2 text-center text-sm">{v.title}</div>
          </button>
        ))}
      </div>

      {currentVideo && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white text-4xl"
            >
              ✕
            </button>

            <video
              ref={videoRef}
              controls
              className="w-full max-h-[80vh] rounded-xl shadow-xl object-contain"
              src={currentVideo.videoUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
}