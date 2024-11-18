// components/ItemCarousel.tsx

import React, { useState } from 'react';
import ItemCard from './itemCard';

interface ItemCarouselProps {
  items: {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    price: string;
    onAddToCart: () => void,
  }[];
}

const ItemCarousel: React.FC<ItemCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="flex gap-8 pb-4 pt-2 overflow-x-auto scroll-smooth">
        {/* Using responsive classes for different screen sizes */}
        <div className="flex gap-4 sm:w-[calc(100%-48px)] md:w-[calc(100%-96px)] lg:w-[calc(100%-144px)] xl:w-[calc(100%-192px)]">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex-shrink-0 transition-transform transform ${
                index === currentIndex ? 'scale-100' : 'scale-90 opacity-70'
              }`}
            >
              <ItemCard
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                price={item.price}
                onAddToCart={item.onAddToCart}
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

export default ItemCarousel;