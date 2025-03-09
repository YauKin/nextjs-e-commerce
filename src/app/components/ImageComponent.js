'use client';

import Image from "next/image";

export default function ImageComponent({ src, alt, className = "", priority = false, sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", fill = true, width, height }) {
  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className="object-cover"
          priority={priority}
          sizes={sizes}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className="object-cover"
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}