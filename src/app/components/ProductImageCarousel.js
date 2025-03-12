'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import LoadingSpinner from './LoadingSpinner';

export default function ProductImageCarousel({ mainImage, productName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const handleMouseMove = (e) => {
    if (isZoomed) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    }
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  if (!mainImage) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {/* Main image container */}
      <div 
        className={`relative overflow-hidden rounded-lg bg-background ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        style={{ height: '500px' }}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
            <LoadingSpinner size="medium" />
          </div>
        )}
        
        {isError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">Failed to load image</span>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={mainImage}
              alt={productName}
              fill
              className={`
                object-contain transition-all duration-300 
                ${isLoading ? 'opacity-0' : 'opacity-100'}
                ${isZoomed ? 'scale-150' : 'scale-100'}
              `}
              style={isZoomed ? {
                transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
              } : {}}
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={handleLoad}
              onError={handleError}
            />
          </div>
        )}
        
        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4">
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-background/80 backdrop-blur-sm shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomToggle();
            }}
          >
            {isZoomed ? 'Zoom Out' : 'Zoom In'}
          </Button>
        </div>
      </div>
    </div>
  );
}