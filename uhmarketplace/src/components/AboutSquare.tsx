'use client';

import React from 'react';

interface AboutSquareProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content: string;
}

const AboutSquare: React.FC<AboutSquareProps> = ({ title, imageSrc, imageAlt, content }) => {
  return (
    <div className="flex gap-6 my-8 flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center">{title}</h1>

      <div className="w-auto h-full px-12">
        <img src={imageSrc} alt={imageAlt} className="object-cover rounded-lg" />
      </div>

      <div className="text-black px-24">
        {content}
      </div>
    </div>
  );
};

export default AboutSquare;
