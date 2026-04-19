"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {  Star, Box,  ArrowRight } from "lucide-react";

export default function HeroSlideshow({ products }: { products: any[] }) {
  const [index, setIndex] = useState(0);

  // Auto-play the slideshow
  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <div className="relative w-full min-h-150 md:h-187.5 flex items-center max-w-350 mx-auto px-6 lg:px-12">
      
      {/* 1. Primary Background Decor - Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-150 bg-violet-200/20 blur-[130px] rounded-full -z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full"
        >
          
          {/* 2. LEFT: Text Content (Occupies 5 columns) */}
          <div className="col-span-1 lg:col-span-5 space-y-10 text-center lg:text-left order-2 lg:order-1 pt-12 lg:pt-0">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-violet-100 border border-violet-200 text-violet-700 backdrop-blur-sm shadow-inner"
            >
              <Box className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Hype Release</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-slate-950 leading-[0.88]"
            >
              {products[index].name.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-300% animate-gradient">
                {products[index].name.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1 >

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-lg md:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Discover {products[index].name}: Where technical mastery meets future-forward design. Curated for the modern minimalist.
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start pt-4"
            >
              <button className="group bg-slate-950 text-white px-12 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-violet-600 transition-all shadow-3xl shadow-violet-200 hover:-translate-y-1">
                PURCHASE <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <div className="text-4xl font-black text-slate-950 flex items-end gap-1">
                Rs.{products[index].price} <span className="text-xs text-slate-400 pb-1">NPR</span>
              </div>
            </motion.div>
          </div>

          {/* 3. RIGHT: Visual Frame (Occupies 7 columns + fixes 0 height error) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, x: 30 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="col-span-1 lg:col-span-7 relative h-112.5 md:h-162.5 w-full lg:pl-16 order-1 lg:order-2"
          >
            {/* The main product image container (defines the 0 height fix) */}
            <div className="relative w-full h-full bg-white rounded-[4rem] p-12 shadow-[0_45px_120px_-15px_rgba(124,58,237,0.18)] border border-violet-100 overflow-hidden group">
              {products[index].imageUrl ? (
                <Image 
                  src={products[index].imageUrl} 
                  alt={products[index].name}
                  fill
                  priority 
                  className="object-contain p-12 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 italic">No Image Data</div>
              )}
              
              {/* Decorative Subtle Background Pattern Overlay */}
              <div className="absolute inset-0 bg-grid opacity-[0.03]" />
            </div>

            {/* Floating Technical Indicator (Design enhancement) */}
            <div className="absolute -top-6 -right-6 bg-white p-7 rounded-[2.5rem] shadow-2xl border border-violet-50 hidden md:flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-950 flex items-center justify-center text-white">
                <Star className="h-4 w-4 fill-white" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em]">Selected Choice</div>
                <p className="text-xs text-slate-500">Premium Grade Material</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 flex gap-4">
        {products.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`h-2 transition-all duration-500 rounded-full shadow-sm ${i === index ? 'w-16 bg-violet-600' : 'w-5 bg-slate-200 hover:bg-violet-300'}`} 
          />
        ))}
      </div>
    </div>
  );
}