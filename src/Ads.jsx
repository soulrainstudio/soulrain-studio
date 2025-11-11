import React from "react";

function Ads({ lang }) {
  return (
    <div>
      <h2>{lang === "en" ? "Ads & Logos" : "广告与标志"}</h2>
      <p>
        {lang === "en"
          ? "Ad and logo creation projects."
          : "广告和标志设计项目。"}
      </p>
    </div>
  );
}

export default Ads;