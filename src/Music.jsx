import React from 'react';

export default function Music({ language }) {
  return (
    <section className="page">
      <h2>{language === 'en' ? 'Music Portfolio' : '音乐作品集'}</h2>
      <p>{language === 'en' ? 'Here are some of our music tracks.' : '这里展示我们的一些音乐作品。'}</p>
    </section>
  );
}