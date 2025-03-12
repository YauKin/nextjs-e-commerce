'use client';

import Image from "next/image";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function ImageComponent({
    src,
    alt,
    className = "",
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    fill = true,
    width = 400,
    height = 300,
    quality = 75,
    objectFit = "contain"
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    if (fill) {
        return (
            <div className={`relative w-full h-full ${className} overflow-hidden`} style={{ position: 'relative', aspectRatio: width / height, maxWidth: '100%', maxHeight: '100%' }}>
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
                        <LoadingSpinner size="small" />
                    </div>
                )}
                {isError ? (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</span>
                    </div>
                ) : (
                    <Image
                        src={src}
                        alt={alt}
                        fill={fill}
                        className={`object-${objectFit} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        priority={priority}
                        sizes={sizes}
                        quality={quality}
                        onLoad={handleLoad}
                        onError={handleError}
                        loading={priority ? 'eager' : 'lazy'}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={className}>
            {isError ? (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</span>
                </div>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    width={width || 800}
                    height={height || 600}
                    className={`w-full h-auto transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    style={{ objectFit }}
                    priority={priority}
                    sizes={sizes}
                    quality={quality}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading={priority ? 'eager' : 'lazy'}
                />
            )}
        </div>
    );
}