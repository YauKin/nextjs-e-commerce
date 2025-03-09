'use client';

import { useCart } from '../contexts/CartContext';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button 
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
}