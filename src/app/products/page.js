'use client';

import { useState } from 'react';
import ProductCard from "@/app/components/ProductCard";
import productsData from "@/data/products.json";

export default function ProductsPage() {
  const { products } = productsData;
  const [cardSize, setCardSize] = useState('medium');

  const sizeClasses = {
    small: 'grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    medium: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    large: 'grid-cols-1 md:grid-cols-2'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setCardSize('small')}
            className={`px-4 py-2 rounded-lg transition-colors ${cardSize === 'small' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Small
          </button>
          <button
            onClick={() => setCardSize('medium')}
            className={`px-4 py-2 rounded-lg transition-colors ${cardSize === 'medium' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Medium
          </button>
          <button
            onClick={() => setCardSize('large')}
            className={`px-4 py-2 rounded-lg transition-colors ${cardSize === 'large' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Large
          </button>
        </div>
      </div>
    
      <div className={`grid ${sizeClasses[cardSize]} gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} size={cardSize} />
        ))}
      </div>
    </div>
  );
}