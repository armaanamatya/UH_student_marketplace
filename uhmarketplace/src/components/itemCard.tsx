import React from 'react';

// Define the props interface for the ItemCard
interface ItemCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  onAddToCart: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, description, imageUrl, price, onAddToCart }) => {
  return (
    <div className="w-full max-w-xs max-h-96 bg-cougRed rounded-lg shadow-lg overflow-hidden">
      <img className="w-full h-56 object-cover" src={imageUrl} alt={title} />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-300 text-sm mt-2">{description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-white">{price}</span>
          <button
            onClick={onAddToCart}
            className="px-4 py-2 bg-white text-cougRed rounded-lg hover:bg-gray-100 focus:outline-none "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
