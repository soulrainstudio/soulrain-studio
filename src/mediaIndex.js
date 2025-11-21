/* ============================================================
   mediaIndex.js — Unified Media Index for Search + Pages
   Soulrain Studio — Improved Version (Option B)
============================================================ */

/* -------------------------------
   1. Helper: Parse EN_ZH title
--------------------------------*/
function parseTitle(filename) {
  const name = filename.replace(/\.[^.]+$/, "");
  const parts = name.split("_");
  return {
    en: parts[0] || name,
    zh: parts[1] || "",
  };
}

/* -------------------------------
   2. Helper: Convert module URL
--------------------------------*/
const toURL = (m) => (typeof m === "string" ? m : m?.default);

/* -------------------------------
   3. Detect thumbnails
--------------------------------*/
const thumbModules = import.meta.glob(
  "/src/assets/**/*.{png,jpg,jpeg,gif}",
  { eager: true }
);

/* Build thumbnail lookup map */
const thumbs = {};
for (const path in thumbModules) {
  const filename = path.split("/").pop().replace(/\.[^.]+$/, "");
  thumbs[filename] = toURL(thumbModules[path]);
}

/* -------------------------------
   4. Detect ALL media types
--------------------------------*/

const videoModules = import.meta.glob(
  [
    "/src/assets/videos/digital-stories/*.{mp4,webm,ogg}",
    "/src/assets/videos/image-building/*.{mp4,webm,ogg}",
    "/src/assets/ads/*.{mp4,webm,ogg}",
    "/src/assets/music/*.{mp4,webm,ogg}",
  ],
  { eager: true }
);

const audioModules = import.meta.glob(
  "/src/assets/music/*.{mp3,wav,ogg}",
  { eager: true }
);

const imageModules = import.meta.glob(
  "/src/assets/images/*.{png,jpg,jpeg,gif}",
  { eager: true }
);

/* -------------------------------
   5. Build media item generator
--------------------------------*/
function buildItem(path, type) {
  const file = path.split("/").pop();
  const base = file.replace(/\.[^.]+$/, "");
  const title = parseTitle(file);

  return {
    id: path,
    url: toURL(
      videoModules[path] ||
      audioModules[path] ||
      imageModules[path]
    ),
    file,
    title,
    thumbnail: thumbs[base] || null,
    type,
    isVideo: type === "video",
    isAudio: type === "audio",
    isImage: type === "image",
    isAd: type === "ad",
  };
}

/* -------------------------------
   6. Build category arrays
--------------------------------*/

export const videos = Object.keys(videoModules)
  .filter((p) =>
    p.includes("digital-stories") || p.includes("image-building")
  )
  .map((p) => buildItem(p, "video"));

export const ads = Object.keys(videoModules)
  .filter((p) => p.includes("/ads/"))
  .map((p) => buildItem(p, "ad"));

export const music = [
  ...Object.keys(videoModules)
    .filter((p) => p.includes("/music/"))
    .map((p) => buildItem(p, "video")), // mp4 music videos

  ...Object.keys(audioModules)
    .map((p) => buildItem(p, "audio")), // mp3 audio
];

export const images = Object.keys(imageModules)
  .map((p) => buildItem(p, "image"));

/* -------------------------------
   7. Unified search index
--------------------------------*/

export const allMedia = [
  ...videos,
  ...ads,
  ...music,
  ...images,
];

/* ============================================================
   End of mediaIndex.js
============================================================ */
