import React from "react";

export default function Photography({ lang }) {
  return (
    <section>
      <h2>{lang === "en" ? "Photography" : "摄影"}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <img src="/images/photo1.jpg" alt="Photo 1" width="300" />
          <p>{lang === "en" ? "Photo 1" : "照片1"}</p>
        </div>
        <div>
          <img src="/images/photo2.jpg" alt="Photo 2" width="300" />
          <p>{lang === "en" ? "Photo 2" : "照片2"}</p>
        </div>
        <div>
          <img src="/images/photo3.jpg" alt="Photo 3" width="300" />
          <p>{lang === "en" ? "Photo 3" : "照片3"}</p>
        </div>
      </div>
    </section>
  );
}