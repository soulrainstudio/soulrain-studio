import React from 'react';

export default function Home({ language }) {
  return (
    <section className="page">
      <h2>{language === 'en' ? 'Welcome to Soulrain Studio' : '欢迎来到雨魂工作室'}</h2>
      <p>
        {language === 'en' 
          ? 'Your creative portfolio for video, music, ads, and logos' 
          : '您的视频、音乐、广告和标志创意作品集'}
      </p>
    </section>
  );
}