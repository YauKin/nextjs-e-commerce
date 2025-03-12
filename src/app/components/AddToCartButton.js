'use client';

import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Button 
      className="w-full" 
      size="lg"
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
}