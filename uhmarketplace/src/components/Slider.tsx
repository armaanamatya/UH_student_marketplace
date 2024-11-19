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
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full h-80 relative"> {/* Increased height */}
            {/* Image */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg" // Adjusted height
            />
            {/* Caption */}
            {index === currentIndex && (
              <div className="absolute bottom-4 left-4 bg-white/80 px-4 py-2 rounded-md shadow-md">
                <p className="text-black text-sm font-medium">{captions[index]}</p>
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
