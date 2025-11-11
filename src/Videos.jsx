import React from 'react';

export default function Videos({ language }) {
  return (
    <section className="page">
      <h2>{language === 'en' ? 'Videos Portfolio' : '视频作品集'}</h2>
      <p>{language === 'en' ? 'Here are some of our videos.' : '这里展示我们的一些视频。'}</p>
    </section>
  );
}