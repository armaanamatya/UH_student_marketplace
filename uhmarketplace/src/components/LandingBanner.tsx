import React from "react";

const LandingBanner = () => {
  return (
    <div className="bg-cover bg-center py-16 text-white relative h-96 mt-[76px]">
      {/* Background Image */}
      <img
        src="landing-images/UH-DINE-SELL.jpg"
        alt="UH Dine and Sell"
        className="absolute top-0 left-0 right-0 bottom-0 opacity-80 -z-1 object-cover h-full w-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold absolute top-1/6 right-2 left-2 text-center">
        BUY, SELL, MEET – ON CAMPUS
      </h2>

      {/* Horizontal Line */}
      <hr className="absolute top-32 right-20 left-20 text-center" />

      {/* Description */}
      <p className="text-md sm:text-lg mt-2 absolute top-40 right-2 left-2 text-center font-semibold">
        Here at CoogBay, you can sell, purchase, and exchange products,
        services, and meet up with fellow students.
      </p>
    </div>
  );
};

export default LandingBanner;
