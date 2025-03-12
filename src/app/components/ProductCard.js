'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ImageComponent from './ImageComponent';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';

export default function ProductCard({ product, size = 'medium' }) {
  const { addToCart } = useCart();

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] duration-300">
      <Link href={`/products/${product.id}`} className="cursor-pointer">
        <CardHeader className="p-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            <ImageComponent
              src={product.image}
              alt={product.name}
              priority={false}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              objectFit="cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <CardTitle className={`${sizeClasses[size]} mb-2 line-clamp-1 hover:text-primary transition-colors`}>{product.name}</CardTitle>
          <p className={`text-muted-foreground font-semibold ${sizeClasses[size]} text-primary`}>${product.price.toFixed(2)}</p>
          <p className={`${size === 'small' ? 'text-xs' : 'text-sm'} text-muted-foreground mt-2 line-clamp-2 leading-relaxed`}>
            {product.description}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full hover:scale-[1.02] transition-transform"
          onClick={() => addToCart(product)}
          variant="default"
          size={size === 'small' ? 'sm' : 'default'}
        >
          加入購物車
        </Button>
      </CardFooter>
    </Card>
  );
}