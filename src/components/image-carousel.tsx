"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    link?: string;
    onClick?: () => void;
  }[];
  autoScrollInterval?: number;
}

export function ImageCarousel({ images, autoScrollInterval = 3000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll images left to right
  useEffect(() => {
    if (!isHovered && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoScrollInterval);
      return () => clearInterval(interval);
    }
  }, [isHovered, images.length, autoScrollInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleImageClick = (image: typeof images[0]) => {
    if (image.onClick) {
      image.onClick();
    }
    if (image.link) {
      window.open(image.link, "_blank");
    }
  };

  if (images.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Rectangular size 16:9 ratio */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(image)}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out cursor-pointer ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              pointerEvents: index === currentIndex ? "auto" : "none",
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay with button indicator */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 hover:opacity-100 bg-black/50 text-white px-4 py-2 rounded-full text-sm transition-all duration-300">
                Click to view →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all z-10"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all z-10"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? "w-8 h-2 bg-white rounded-full" 
                : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
      }
