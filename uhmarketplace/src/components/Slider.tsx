"use client";

import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[]; // Array of image URLs
  captions: string[]; // Array of captions for each image
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, captions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextSlide = () => {
    if (animating) return; // Prevent triggering during animation
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setAnimating(false);
    }, 500); // Animation duration matches the CSS transition
  };

  const prevSlide = () => {
    if (animating) return; // Prevent triggering during animation
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setAnimating(false);
    }, 500); // Animation duration matches the CSS transition
  };

  // Automatically slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds interval

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full h-96 relative">
            {/* Image */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            {/* Centered Caption */}
            {index === currentIndex && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4">
                  {captions[index]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white/90"
        onClick={prevSlide}
        disabled={animating} // Disable button while animating
      >
        ◀
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white/90"
        onClick={nextSlide}
        disabled={animating} // Disable button while animating
      >
        ▶
      </button>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            disabled={animating} // Disable indicators while animating
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
