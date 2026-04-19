"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Trash2, Plus, Minus, ArrowLeft, 
  ShoppingBag, CreditCard, ShieldCheck 
} from "lucide-react";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150; // Free shipping over 5000
  const total = subtotal + shipping;

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-slate-300" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Your bag is empty</h1>
        <p className="text-slate-500 mb-8 max-w-xs">Looks like you haven't added anything to your collection yet.</p>
        <Link 
          href="/products" 
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-violet-600 transition-all active:scale-95"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F3F0]/30 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Link href="/products" className="flex items-center gap-2 text-violet-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4 hover:gap-3 transition-all">
              <ArrowLeft size={14} /> Back to shop
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Shopping Bag<span className="text-violet-600">.</span></h1>
          </div>
          <button 
            onClick={clearCart}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
          >
            Clear Bag
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Product List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] p-4 flex flex-col sm:flex-row items-center gap-6 border border-white transition-all hover:shadow-2xl hover:shadow-slate-200/50">
                <div className="h-32 w-32 bg-slate-50 rounded-[1.5rem] overflow-hidden relative shrink-0">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>

                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Premium Edition</p>
                  <p className="text-violet-600 font-black">Rs. {item.price}</p>
                </div>

                {/* Stepper for Cart */}
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
                  <button 
                    onClick={() => addToCart({ ...item, decrease: true })}
                    className="h-8 w-8 flex items-center justify-center rounded-xl bg-white text-slate-900 hover:bg-violet-600 hover:text-white transition-all shadow-sm"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center font-black text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="h-8 w-8 flex items-center justify-center rounded-xl bg-white text-slate-900 hover:bg-violet-600 hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-4 text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary */}
         {/* RIGHT: Order Summary */}
<div className="lg:col-span-4 sticky top-32">
  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/20">
    <h2 className="text-xl font-black tracking-tight mb-8">Order Summary</h2>
    
    <div className="space-y-4 mb-8">
      <div className="flex justify-between text-sm text-slate-400 font-bold">
        <span>Subtotal</span>
        <span className="text-white">Rs. {subtotal}</span>
      </div>
      <div className="flex justify-between text-sm text-slate-400 font-bold">
        <span>Shipping</span>
        <span className="text-white">{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
      </div>
      <div className="pt-4 border-t border-slate-800 flex justify-between">
        <span className="font-black uppercase tracking-widest text-[10px]">Total Amount</span>
        <span className="text-2xl font-black">Rs. {total}</span>
      </div>
    </div>

    {/* Updated Checkout Button with Link */}
    <Link 
      href="/checkout" 
      className="w-full bg-violet-600 hover:bg-violet-500 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 mb-6 shadow-xl shadow-violet-900/20"
    >
      <CreditCard size={18} /> Secure Checkout
    </Link>

    <div className="space-y-3">
      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <ShieldCheck size={16} className="text-emerald-500" /> 256-bit SSL Encryption
      </div>
      <p className="text-[9px] text-slate-500 leading-relaxed font-medium">
        Tax calculated at checkout. By proceeding, you agree to our Terms of Service.
      </p>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}