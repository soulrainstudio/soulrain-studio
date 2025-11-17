import { useState, useRef, useEffect } from "react";

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

const audios = Object.keys(audioModules).map((path) => {
  const baseName = path.split("/").pop().replace(/\.[^.]+$/, "");
  return {
    name: path.split("/").pop(),
    src: audioModules[path].default || audioModules[path],
    type: "audio",
    thumbnail:
      thumbnailModules[`/src/assets/music/${baseName}.jpg`]?.default ||
      thumbnailModules[`/src/assets/music/${baseName}.png`]?.default ||
      null,
  };
});

const videos = Object.keys(videoModules).map((path) => {
  const baseName = path.split("/").pop().replace(/\.[^.]+$/, "");
  return {
    name: path.split("/").pop(),
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
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleThumbnailClick = (track) => {
    setCurrentTrack(track);
    setShowPlayer(true);
    setIsPlaying(true);

    setTimeout(() => {
      if (track.type === "audio" && audioRef.current) audioRef.current.play();
      if (track.type === "video" && videoRef.current) videoRef.current.play();
    }, 0);
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-3">
        {language === "en" ? "Music" : "音乐"}
      </h1>

      <div className="page-description">
        {language === "en"
          ? "Music that carries emotion, tells quiet stories, and comes to life through sound and imagery."
          : "以音乐承载情绪、诉说故事，并以声与影让作品鲜活呈现。"}
      </div>

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
              <span className="text-sm text-center">{track.name}</span>
            </button>
          ))}
        </div>
      )}

      {showPlayer && currentTrack && (
        <div className="flex flex-col items-center w-full">
          <button
            onClick={() => {
              setShowPlayer(false);
              setCurrentTrack(null);
              setIsPlaying(false);
            }}
            className="self-end mb-4 text-2xl font-bold px-3 py-1 bg-gray-700 rounded hover:bg-gray-900"
          >
            ✕
          </button>

          {currentTrack.type === "audio" ? (
            <div className="flex flex-col items-center w-full max-w-md">
              {currentTrack.thumbnail && (
                <img
                  src={currentTrack.thumbnail}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
              )}

              <div className="flex items-center w-full">
                <button
                  onClick={() => {
                    if (isPlaying) audioRef.current.pause();
                    else audioRef.current.play();
                    setIsPlaying(!isPlaying);
                  }}
                  className="px-3 py-1 bg-gray-700 text-white rounded mr-2"
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <span className="ml-2 text-sm">{formatTime(currentTime)}</span>
              </div>

              <audio
                ref={audioRef}
                src={currentTrack.src}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                onEnded={() => setIsPlaying(false)}
                style={{ display: "none" }}
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={currentTrack.src}
              controls
              autoPlay
              className="w-full max-w-3xl rounded"
              onEnded={() => setIsPlaying(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}