import React from 'react';
import { Post } from '@prisma/client';

// Define the props interface for the ItemCard
interface ItemCardProps {
    item: Post
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="w-full max-w-xs max-h-96 bg-cougRed rounded-lg shadow-lg overflow-hidden">
      <img className="w-full h-56 object-cover" src={item.imageUrl as string || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVYS7KEXYFAwqdRCW81e4DSR_nSLYSFStx1Q&s"} alt={item.title} />
      
      <div className="p-4 text-black">
        <h3 className="text-lg font-semibold text-black">{item.title}</h3>
        <p className="text-sm mt-2 text-black">{item.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-black">${item.price.toString()}</span>
          
          {/* Commenting this out for now because I am not sure if we will get to this in time 
          and it displays an error when using actual DB data 
          <button
            onClick={onAddToCart}
            className="px-4 py-2 bg-white text-cougRed rounded-lg hover:bg-gray-100 focus:outline-none "
          >
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;