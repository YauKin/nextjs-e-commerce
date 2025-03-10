'use client';

import { useCart } from '../contexts/CartContext';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const cartRef = useRef();
  const router = useRouter();

  // Handle click outside to close cart
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeCart]);

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 z-50 backdrop-blur-sm">
      <div
        ref={cartRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transform transition-all duration-300 ease-in-out translate-x-0 dark:bg-gray-900"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
            <h2 className="text-xl font-bold dark:text-white">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="mt-2">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" sizes="(max-width: 768px) 80px, 80px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">${item.price}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                      aria-label="Remove item"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t dark:border-gray-800 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium dark:text-white">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold dark:text-white">Total:</span>
              <span className="text-xl font-bold dark:text-white">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
              onClick={() => {
                closeCart();
                router.push('/checkout');
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}