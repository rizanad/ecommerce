"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ShoppingCart, 
  Search, 
  User, 
  Menu, 
  Sparkles, 
  UserPlus 
} from "lucide-react";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCart((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/#categories");
    } else {
      const element = document.getElementById("categories");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-100 w-full border-b border-violet-100 bg-white/80 backdrop-blur-xl">
      <div className="max-w-350 mx-auto flex h-20 items-center justify-between px-6 md:px-10">
        
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-2 transition-transform active:scale-95">
            <div className="h-9 w-9 rounded-lg bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
              <Sparkles className="h-5 w-5 fill-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              ORCHID<span className="text-violet-600">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <Link href="/products" className="hover:text-violet-600 transition-colors">
              All Products
            </Link>
            
            <button 
              onClick={handleCategoryClick}
              className="hover:text-violet-600 transition-colors uppercase cursor-pointer outline-none"
            >
              Categories
            </button>

            <Link href="/new-arrivals" className="hover:text-violet-600 transition-colors">
              New
            </Link>
          </nav>
        </div>

        <div className="hidden flex-1 px-8 max-w-md md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-violet-200 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link 
            href="/login" 
            className="hidden items-center gap-2 px-3 py-2 text-slate-600 hover:text-violet-600 font-bold text-xs uppercase transition-colors sm:flex"
          >
            <User className="h-4 w-4" />
            Login
          </Link>

          <Link 
            href="/register" 
            className="hidden items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-tighter hover:bg-violet-600 transition-all active:scale-95 md:flex"
          >
            <UserPlus className="h-4 w-4" />
            Sign Up
          </Link>

          <Link 
            href="/cart" 
            className="group relative p-3 text-slate-600 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-all"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-black text-white animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>

          <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}