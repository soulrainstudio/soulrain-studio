const fs = require("fs");
const path = require("path");

// Folders to scan
const folders = ["Ads", "Music", "Videos", "Images"];

folders.forEach((folder) => {
  const folderPath = path.join(__dirname, "public", folder);
  const outputFile = path.join(folderPath, `${folder.toLowerCase()}.json`);

  const allFiles = fs.readdirSync(folderPath);

  let media = [];

  if (folder === "Images") {
    const imageFiles = allFiles.filter(f => f.endsWith(".jpg") || f.endsWith(".png"));
    media = imageFiles.map(file => ({
      title: path.parse(file).name,
      src: `/${folder}/${file}`
    }));
  } else {
    const videoFiles = allFiles.filter(f => f.endsWith(".mp4"));
    const thumbFiles = allFiles.filter(f => f.endsWith(".jpg"));
    media = videoFiles.map(videoFile => {
      const fileName = path.parse(videoFile).name;
      const thumbnail = thumbFiles.find(t => path.parse(t).name === fileName) || "";
      return {
        title: fileName,
        src: `/${folder}/${videoFile}`,
        thumbnail: thumbnail ? `/${folder}/${thumbnail}` : ""
      };
    });
  }

  fs.writeFileSync(outputFile, JSON.stringify(media, null, 2));
  console.log(`✅ Generated ${outputFile} with ${media.length} items.`);
});