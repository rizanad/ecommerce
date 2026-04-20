"use client";

import { ShoppingCart, Plus, Minus, AlertCircle } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useState, useEffect } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { cart, addToCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  const MAX_LIMIT = 10;

  // Sync with store
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Prevent Hydration Mismatch
  useEffect(() => setMounted(true), []);

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity < MAX_LIMIT) {
      addToCart(product);
    } else {
      setShowLimitWarning(true);
      setTimeout(() => setShowLimitWarning(false), 2000);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 0) {
      addToCart({ ...product, decrease: true });
    }
  };

  if (!mounted) return <div className="h-11 w-11 bg-slate-100 rounded-xl animate-pulse" />;

  return (
    <div className="relative flex flex-col items-end">
      {/* Limit Notification */}
      {showLimitWarning && (
        <div className="absolute -top-10 right-0 bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 animate-in fade-in slide-in-from-bottom-2 z-10 whitespace-nowrap">
          <AlertCircle size={12} /> LIMIT REACHED
        </div>
      )}

      <div 
        className={`flex items-center transition-all duration-300 ease-out rounded-xl h-11 ${
          quantity > 0 ? "bg-slate-900 w-28 px-1" : "bg-slate-900 w-11 justify-center hover:bg-violet-600 shadow-lg shadow-slate-200"
        }`}
      >
        {quantity > 0 ? (
          <div className="flex items-center justify-between w-full">
            <button 
              onClick={handleDecrement}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            
            <span className="text-xs font-black text-white tabular-nums">
              {quantity}
            </span>

            <button 
              onClick={handleIncrement}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleIncrement}
            className="flex h-full w-full items-center justify-center text-white"
          >
            <ShoppingCart size={18} />
          </button>
        )}
      </div>
    </div>
  );
}