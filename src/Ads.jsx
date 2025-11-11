import React from 'react';

export default function Ads({ language }) {
  return (
    <section className="page">
      <h2>{language === 'en' ? 'Ads & Logos' : '广告和标志'}</h2>
      <p>{language === 'en' ? 'Here are our ads and logos.' : '这里展示我们的广告和标志作品。'}</p>
    </section>
  );
}