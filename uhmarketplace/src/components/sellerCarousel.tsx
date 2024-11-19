'use client'

import React, { useState } from 'react';
import SellerSummaryCard from './sellerCard';

interface CarouselItem {
  id: number;
  sellerName: string;
  sellerImage: string;
  rating: number;
  totalProducts: number;
  bio: string;
  onViewProfile: () => void;
}

interface SellerCarouselProps {
  sellers: CarouselItem[];
}


const SellerCarousel: React.FC<SellerCarouselProps> = ({ sellers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sellers.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sellers.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="flex gap-8 pb-4 pt-2 overflow-x-auto scroll-smooth">
        {/* Using responsive classes for different screen sizes */}
        <div className="flex gap-4 sm:w-[calc(100%-48px)] md:w-[calc(100%-96px)] lg:w-[calc(100%-144px)] xl:w-[calc(100%-192px)]">
          {sellers.map((seller, index) => (
            <div
              key={seller.id}
              className={`flex-shrink-0 transition-transform transform ${
                index === currentIndex ? 'scale-100' : 'scale-90 opacity-70'
              }`}
            >
              <SellerSummaryCard
                sellerName={seller.sellerName}
                sellerImage={seller.sellerImage}
                rating={seller.rating}
                totalProducts={seller.totalProducts}
                bio={seller.bio}
                onViewProfile={seller.onViewProfile}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        &#8250;
      </button>
    </div>
  );
};

export default SellerCarousel;