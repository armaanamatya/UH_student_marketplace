'use client'

import React from "react";

interface SellerSummaryCardProps {
  sellerName: string;
  sellerImage: string;
  rating: number;
  totalProducts: number;
  bio: string;
}

const SellerSummaryCard: React.FC<SellerSummaryCardProps> = ({
  sellerName,
  sellerImage,
  rating,
  totalProducts,
  bio,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full border border-gray-200">
      {/* Seller Image and Name */}
      <div className="flex items-center p-4">
        <img
          src={sellerImage}
          alt={sellerName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-800">{sellerName}</h3>
          <div className="flex items-center text-yellow-500 mt-1">
            {/* Render rating stars */}
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? "fill-current" : "text-gray-300"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.27l5.18 3.73-1.64-6.91L18 7.24l-6.92-.59L10 1 8.92 6.65 2 7.24l4.46 5.85-1.64 6.91L10 15.27z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500">({rating}/5)</span>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="px-4 py-2">
        <p className="text-sm text-gray-600">{bio}</p>
      </div>

      {/* Products and View Profile */}
      <div className="flex justify-between items-center p-4 bg-cougRed border-t">
        <div className="text-sm text-gray-200">
          <span>{totalProducts} Products</span>
        </div>
        <button
          className="text-sm text-white hover:text-gray-200 focus:outline-none"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default SellerSummaryCard;