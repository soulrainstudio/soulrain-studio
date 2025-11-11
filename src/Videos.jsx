import React from "react";

export default function Videos({ lang }) {
  return (
    <section>
      <h2>{lang === "en" ? "Videos" : "视频"}</h2>
      <video controls width="600">
        <source src="/videos/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}