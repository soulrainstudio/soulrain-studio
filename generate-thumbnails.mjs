/**
 * Soulrain Studio — Clean FFmpeg-only Thumbnail Generator
 * (No sharp, no text overlay — stable version)
 */

import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const ROOT = path.join(process.cwd(), "src", "assets");

// Folders that contain videos
const FOLDERS = [
  "videos/digital-stories",
  "videos/image-building",
  "ads",
  "music"
];

// Video formats supported
const VIDEO_EXTS = [".mp4", ".webm", ".mov", ".ogg", ".MP4"];

function isVideo(file) {
  return VIDEO_EXTS.includes(path.extname(file));
}

function extractFrame(inputFile, outputFile) {
  console.log(`🎞 Extracting: ${inputFile}`);

  const ff = spawnSync("ffmpeg", [
    "-y",
    "-i", inputFile,
    "-frames:v", "1",
    "-vf", "scale=640:-1",
    outputFile
  ], {
    stdio: "ignore"
  });

  if (ff.status !== 0) {
    console.log("❌ Failed:", outputFile);
  } else {
    console.log("✔ Generated:", outputFile);
  }
}

function run() {
  console.log("🔍 Scanning for video thumbnails...\n");

  for (const folder of FOLDERS) {
    const fullFolder = path.join(ROOT, folder);
    if (!fs.existsSync(fullFolder)) continue;

    const files = fs.readdirSync(fullFolder);

    for (const file of files) {
      if (!isVideo(file)) continue;

      const basename = file.replace(/\.[^.]+$/, "");
      const inputFile = path.join(fullFolder, file);
      const outputFile = path.join(fullFolder, basename + ".png");

      if (fs.existsSync(outputFile)) {
        console.log("✔ Exists:", outputFile);
        continue;
      }

      extractFrame(inputFile, outputFile);
    }
  }

  console.log("\n✅ Thumbnail generation complete.\n");
}

run();