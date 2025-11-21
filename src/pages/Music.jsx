import { useState, useRef } from "react";

/* ---------------------------
   TITLE PARSER (English_Chinese)
   Example:  songTitle_歌曲名.mp3
--------------------------- */
function parseTitle(filename) {
  const name = filename.replace(/\.[^.]+$/, "");
  const parts = name.split("_");

  return {
    en: parts[0] || name,
    zh: parts[1] || "",
  };
}

/* Load modules */
const audioModules = import.meta.glob("/src/assets/music/*.{mp3,wav}", {
  eager: true,
});
const videoModules = import.meta.glob("/src/assets/music/*.{mp4,webm}", {
  eager: true,
});
const thumbnailModules = import.meta.glob(
  "/src/assets/music/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

/* Process audio files */
const audios = Object.keys(audioModules).map((path) => {
  const file = path.split("/").pop();
  const baseName = file.replace(/\.[^.]+$/, "");

  return {
    title: parseTitle(file),
    name: file,
    src: audioModules[path].default || audioModules[path],
    type: "audio",
    thumbnail:
      thumbnailModules[`/src/assets/music/${baseName}.jpg`]?.default ||
      thumbnailModules[`/src/assets/music/${baseName}.png`]?.default ||
      null,
  };
});

/* Process video files */
const videos = Object.keys(videoModules).map((path) => {
  const file = path.split("/").pop();
  const baseName = file.replace(/\.[^.]+$/, "");

  return {
    title: parseTitle(file),
    name: file,
    src: videoModules[path].default || videoModules[path],
    type: "video",
    thumbnail:
      thumbnailModules[`/src/assets/music/${baseName}.jpg`]?.default ||
      thumbnailModules[`/src/assets/music/${baseName}.png`]?.default ||
      null,
  };
});

const mediaTracks = [...audios, ...videos];

export default function Music({ language }) {
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleThumbnailClick = (track) => {
    setCurrentTrack(track);
    setShowPlayer(true);

    setTimeout(() => {
      if (track.type === "audio" && audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      if (track.type === "video" && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 20);
  };

  const closePlayer = () => {
    if (audioRef.current) audioRef.current.pause();
    if (videoRef.current) videoRef.current.pause();
    setShowPlayer(false);
    setCurrentTrack(null);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-3">
        {language === "en" ? "Music" : "音乐"}
      </h1>

      <div className="page-description mb-6">
        {language === "en"
          ? "Music that carries emotion, tells quiet stories, and comes to life through sound and imagery."
          : "以音乐承载情绪、诉说故事，并以声与影让作品鲜活呈现。"}
      </div>

      {/* ========== THUMBNAIL GRID ========== */}
      {!showPlayer && (
        <div className="flex flex-wrap justify-center gap-4">
          {mediaTracks.map((track, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center border rounded-lg p-2 hover:border-blue-500"
              onClick={() => handleThumbnailClick(track)}
            >
              {track.thumbnail ? (
                <img
                  src={track.thumbnail}
                  className="w-32 h-32 object-cover mb-2 rounded"
                />
              ) : track.type === "audio" ? (
                <div className="w-32 h-32 bg-gray-400 flex items-center justify-center mb-2 rounded">
                  <span className="text-white text-3xl">♪</span>
                </div>
              ) : (
                <video
                  src={track.src}
                  className="w-32 h-32 object-cover mb-2 rounded"
                  muted
                />
              )}

              {/* Bilingual Title */}
              <span className="text-sm text-center">
                {language === "en"
                  ? track.title.en
                  : track.title.zh || track.title.en}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ========== PLAYER AREA ========== */}
      {showPlayer && currentTrack && (
        <div className="flex flex-col items-center w-full mt-4">
          {/* AUDIO PLAYER ------------------------- */}
          {currentTrack.type === "audio" && (
            <>
              <button
                onClick={closePlayer}
                className="self-end mb-4 text-2xl font-bold px-3 py-1 bg-gray-700 rounded hover:bg-gray-900"
              >
                ✕
              </button>

              <div className="w-full max-w-md flex flex-col items-center">
                {currentTrack.thumbnail && (
                  <img
                    src={currentTrack.thumbnail}
                    className="w-full h-64 object-cover mb-4 rounded"
                  />
                )}

                {/* NATIVE AUDIO CONTROLS (same slider UI as video) */}
                <audio
                  ref={audioRef}
                  src={currentTrack.src}
                  controls
                  autoPlay
                  style={{ width: "100%" }}
                />
              </div>
            </>
          )}

          {/* VIDEO PLAYER — ADS STYLE OVERLAY ------ */}
          {currentTrack.type === "video" && (
            <div className="ads-player-overlay">
              <button className="ads-close-btn" onClick={closePlayer}>
                ✕
              </button>

              <video
                ref={videoRef}
                src={currentTrack.src}
                controls
                autoPlay
                className="ads-full-media"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}