"use client";
import React from "react";

const MenuSkeleton = () => {
  return (
    <>
      <div className="animate-pulse">
        {/* Title */}
        <div className="w-full h-6 bg-gray-300 rounded mb-4"></div>

        {/* Sub Title */}
        <div className="w-full h-6 bg-gray-300 rounded mb-4"></div>

        {/* Background Image */}
        <div className="w-24 h-24 bg-gray-300 rounded mb-4"></div>

        {/* Icon Section */}
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-full h-6 bg-gray-300 rounded mb-4"
          ></div>
        ))}

        {/* Button */}
        <div className="w-full h-10 bg-gray-300 rounded"></div>
      </div>
    </>
  );
};

export default MenuSkeleton;
