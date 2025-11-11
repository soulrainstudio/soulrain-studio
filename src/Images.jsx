import React from 'react';

export default function Images({ language }) {
  return (
    <section className="page">
      <h2>{language === 'en' ? 'Images Portfolio' : '图片作品集'}</h2>
      <p>{language === 'en' ? 'Here are some of our images.' : '这里展示我们的一些图片。'}</p>
    </section>
  );
}