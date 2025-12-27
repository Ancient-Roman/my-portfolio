import React from 'react';
import Image from './Image';

const positionStyles = {
  '-1': {
    transform: 'translateX(-220px) scale(0.7)',
    opacity: 0.6,
    zIndex: 1,
  },
  '0': {
    transform: 'translateX(0px) scale(1)',
    opacity: 1,
    zIndex: 2,
  },
  '1': {
    transform: 'translateX(220px) scale(0.7)',
    opacity: 0.6,
    zIndex: 1,
  },
};
const hiddenStyle = {
  transform: 'translateX(0px) scale(0.5)',
  opacity: 0,
  zIndex: 0,
};


/**
 * ImageCarousel Component
 * Displays a main centered image with smaller preview images on the sides
 * Supports infinite scrolling and manual dot navigation
 * 
 * @param {Array} images - Array of image URLs to display
 * @param {String} alt - Alt text for images
 * @param {String} className - Additional CSS classes for the image
 */
function ImageCarousel({ images = [], alt = "", className = "" }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = React.useRef(null);

  const getRelativeIndex = (index) => {
    const diff = index - currentIndex;
    const half = Math.floor(images.length / 2);

    if (diff > half) return diff - images.length;
    if (diff < -half) return diff + images.length;
    return diff;
};


  // If only one image, render without carousel
  if (images.length <= 1) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={images[0]}
          alt={alt}
          className={`h-32 max-w-80 object-contain ${className}`}
        />
      </div>
    );
  }

  // Get circular indices for previous, current, and next
  const getPrevIndex = () => (currentIndex - 1 + images.length) % images.length;
  const getNextIndex = () => (currentIndex + 1) % images.length;

  // Navigate to next/previous
  const goToPrevious = () => {
    setCurrentIndex(getPrevIndex());
  };

  const goToNext = () => {
    setCurrentIndex(getNextIndex());
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  // Multiple images - render carousel with side images
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {/* Image carousel container */}
      <div
        ref={carouselRef}
        className="relative w-full h-64 flex items-center justify-center overflow-hidden"
      >
        {images.map((src, index) => {
            const relative = getRelativeIndex(index);
            const style =
            positionStyles[relative] ?? hiddenStyle;

            return (
            <div
                key={index}
                className="absolute transition-all duration-500 ease-in-out cursor-pointer"
                style={{
                width: relative === 0 ? '280px' : '140px',
                height: relative === 0 ? '200px' : '140px',
                ...style,
                }}
                onClick={() => setCurrentIndex(index)}
            >
                <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                className={`h-full w-full object-contain ${className}`}
                />
            </div>
            );
        })}

        {/* Left arrow button */} 
        <button 
            onClick={goToPrevious} 
            className="absolute left-4 z-20 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 transition-all" 
            aria-label="Previous image" 
        > 
            <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            > 
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                /> 
            </svg>
        </button> 
        
        {/* Right arrow button */} 
        <button onClick={goToNext} className="absolute right-4 z-20 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 transition-all" aria-label="Next image" > 
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> 
            </svg> 
        </button>
    </div>


      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                index === currentIndex
                  ? 'bg-gray-700 w-3 h-3'
                  : 'bg-gray-300 w-2 h-2 hover:bg-gray-500'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
