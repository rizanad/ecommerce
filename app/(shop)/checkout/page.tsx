"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/store/useCart";
import { 
  ShieldCheck, Lock, CreditCard, 
  CheckCircle2, ArrowLeft, Package, 
  Truck, Loader2 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { cart, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "", 
    email: "", 
    address: "",
    cardNumber: "", 
    expiry: "", 
    cvc: ""
  });

  useEffect(() => {
    setMounted(true);
    // Pre-fill data if user is logged in
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        fullName: session.user.name || "",
        email: session.user.email || ""
      }));
    }
  }, [session]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === "expiry") {
      const formatted = value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').trim().slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = () => {
    return formData.fullName && formData.email.includes("@") && formData.address;
  };

  const validateStep2 = () => {
    const cleanCard = formData.cardNumber.replace(/\s/g, '');
    const cleanExpiry = formData.expiry.replace('/', '');
    return cleanCard.length === 16 && cleanExpiry.length === 4 && formData.cvc.length >= 3;
  };

  const handleFinalPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 2500);
  };

  if (!mounted) return null;

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 text-emerald-600">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Order Confirmed!</h1>
        <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
          Thank you for choosing <span className="text-violet-600 font-bold">ORCHID</span>. 
          Your payment was successful and your gear is being prepared.
        </p>
        
        <div className="bg-slate-50 p-8 rounded-[2.5rem] w-full max-w-md space-y-4 mb-10 border border-slate-100">
          <div className="flex items-center gap-4 text-left">
            <Truck className="text-violet-600" size={24} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimated Delivery</p>
              <p className="text-sm font-bold text-slate-900">Arriving in 3-5 Business Days</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left border-t border-slate-200 pt-4">
            <Package className="text-violet-600" size={24} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</p>
              <p className="text-sm font-bold text-slate-900">#ORD-{Math.floor(Math.random() * 1000000)}</p>
            </div>
          </div>
        </div>

        <Link href="/products" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-violet-600 transition-all">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-7 space-y-6">
          <Link href="/cart" className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4 hover:text-violet-600 transition-colors">
            <ArrowLeft size={14} /> Review Bag
          </Link>

          <section className={`bg-white rounded-[2rem] p-8 border transition-all duration-500 ${step === 1 ? "border-violet-600 shadow-xl shadow-violet-100" : "border-slate-100 opacity-60"}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black ${step === 1 ? "bg-violet-600 text-white" : "bg-emerald-500 text-white"}`}>
                {step > 1 ? <CheckCircle2 size={20} /> : "1"}
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">Shipping Details</h2>
            </div>

            {step === 1 && (
              <div className="grid grid-cols-2 gap-4">
                <input 
                  name="fullName" 
                  required 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="Full Name *" 
                  className="col-span-2 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200 text-sm font-medium" 
                />
                <input 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  type="email" 
                  placeholder="Email Address *" 
                  className="col-span-2 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200 text-sm font-medium" 
                />
                <input 
                  name="address" 
                  required 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="Full Delivery Address *" 
                  className="col-span-2 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200 text-sm font-medium" 
                />
                <button 
                  disabled={!validateStep1()}
                  onClick={() => setStep(2)}
                  className="col-span-2 mt-4 bg-slate-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            )}
          </section>

          <section className={`bg-white rounded-[2rem] p-8 border transition-all duration-500 ${step === 2 ? "border-violet-600 shadow-xl shadow-violet-100" : "border-slate-100 opacity-60"}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black ${step === 2 ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                2
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">Payment</h2>
            </div>

            {step === 2 && (
              <div className="space-y-4">
                <div className="p-4 border-2 border-violet-600 rounded-2xl bg-violet-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3"><CreditCard className="text-violet-600" /><span className="font-bold text-sm">Secured Card Payment</span></div>
                  <Lock size={18} className="text-violet-600" />
                </div>
                
                <input name="cardNumber" maxLength={19} value={formData.cardNumber} onChange={handleInputChange} type="text" placeholder="0000 0000 0000 0000 *" className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200 text-sm font-mono" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="expiry" maxLength={5} value={formData.expiry} onChange={handleInputChange} type="text" placeholder="MM/YY *" className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200 text-sm" />
                  <input name="cvc" maxLength={3} value={formData.cvc} onChange={handleInputChange} type="text" placeholder="CVC *" className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200 text-sm" />
                </div>

                <button 
                  disabled={!validateStep2() || isProcessing}
                  onClick={handleFinalPayment}
                  className="w-full mt-4 bg-violet-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-violet-200 hover:bg-violet-700 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Processing...
                    </>
                  ) : `Confirm & Pay Rs. ${subtotal}`}
                </button>
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100">
            <h3 className="font-black text-slate-900 mb-6 uppercase text-[10px] tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" /> Secure Checkout
            </h3>
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-slate-50 rounded-lg relative overflow-hidden shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[11px] font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-black">Rs.{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-50 flex justify-between items-center font-black">
              <span className="text-xs uppercase tracking-widest text-slate-400">Total</span>
              <span className="text-xl text-slate-900">Rs.{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}