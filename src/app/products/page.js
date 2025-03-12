'use client';

import { useState } from 'react';
import ProductCard from "@/app/components/ProductCard";
import productsData from "@/data/products.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <Card className="border-0 shadow-sm bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
          <CardContent className="p-2 flex gap-2">
            <Button
              onClick={() => setCardSize('small')}
              variant={cardSize === 'small' ? 'default' : 'outline'}
              size="sm"
            >
              Small
            </Button>
            <Button
              onClick={() => setCardSize('medium')}
              variant={cardSize === 'medium' ? 'default' : 'outline'}
              size="sm"
            >
              Medium
            </Button>
            <Button
              onClick={() => setCardSize('large')}
              variant={cardSize === 'large' ? 'default' : 'outline'}
              size="sm"
            >
              Large
            </Button>
          </CardContent>
        </Card>
      </div>
    
      <div className={`grid ${sizeClasses[cardSize]} gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} size={cardSize} />
        ))}
      </div>
    </div>
  );
}