import React from "react";

export default function Ads({ lang }) {
  return (
    <section>
      <h2>{lang === "en" ? "Ads / Logos" : "广告 / 标志"}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <img src="/images/ad1.jpg" alt="Ad 1" width="300" />
          <p>{lang === "en" ? "Ad 1" : "广告1"}</p>
        </div>
        <div>
          <img src="/images/ad2.jpg" alt="Ad 2" width="300" />
          <p>{lang === "en" ? "Ad 2" : "广告2"}</p>
        </div>
      </div>
    </section>
  );
}