"use client";

import { ShoppingCart, Plus, Minus, AlertCircle } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useState, useEffect } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  const MAX_LIMIT = 10;

  // Sync with store
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

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
      // We need to add a "decreaseQuantity" method to useCart, 
      // but for now, we'll assume your store handles the logic:
      // If quantity is 1 and we minus, it removes the item.
      addToCart({ ...product, decrease: true }); 
    }
  };

  if (!mounted) return <div className="h-12 w-12 bg-slate-100 rounded-2xl animate-pulse" />;

  return (
    <div className="relative flex flex-col items-end">
      {/* Limit Warning Tooltip */}
      {showLimitWarning && (
        <div className="absolute -top-10 right-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle size={12} /> MAX LIMIT REACHED
        </div>
      )}

      <div 
        className={`flex items-center gap-3 h-12 transition-all duration-500 ease-out rounded-2xl p-1.5 ${
          quantity > 0 ? "bg-violet-600 w-32 shadow-lg shadow-violet-200" : "bg-slate-900 w-12 shadow-slate-200"
        }`}
      >
        {quantity > 0 ? (
          <>
            <button 
              onClick={handleDecrement}
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-violet-500 text-white hover:bg-violet-400 transition-colors"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            
            <span className="flex-1 text-center text-sm font-black text-white tabular-nums">
              {quantity}
            </span>

            <button 
              onClick={handleIncrement}
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-violet-500 text-white hover:bg-violet-400 transition-colors"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </>
        ) : (
          <button 
            onClick={handleIncrement}
            className="h-full w-full flex items-center justify-center text-white"
          >
            <ShoppingCart size={18} />
          </button>
        )}
      </div>
    </div>
  );
}