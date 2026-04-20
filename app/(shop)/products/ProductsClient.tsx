'use client'; 

import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Star, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners"; 
import AddToCartButton from "../../../components/cart/AddToCartButton"; 

const categories = ["Phones", "Shoes", "Accessories", "Laptop", "Gaming"];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    searchParams.get('category') || undefined
  );
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      const categoryParam = activeCategory ? `category=${activeCategory}` : '';
      const res = await fetch(`/api/products?${categoryParam}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false); 
    };
    fetchProducts();
  }, [activeCategory]); 

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || undefined);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#F9F3F0]/30 p-8 md:p-12 font-[family-name:var(--font-jakarta)]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-2 text-violet-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3">
             <Filter size={12} /> {activeCategory ? activeCategory : "Full Catalog"}
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {activeCategory ? `${activeCategory} Collection` : "Our Collections"}
          </h1>
        </header>

        {/* Categories Navbar */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/products"
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              !activeCategory ? "bg-black text-white shadow-lg shadow-slate-200" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
            }`}
          >
            All Items
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat.toLowerCase().trim()}`}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeCategory?.toLowerCase().trim() === cat.toLowerCase().trim()
                  ? "bg-black text-white shadow-lg shadow-slate-200"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {loading ? ( 
          <div className="flex justify-center items-center min-h-[400px]">
            <ClipLoader size={50} color="#6b21a8" /> 
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => (
              <div
                key={p.id}
                className="group flex flex-col rounded-[2.5rem] border border-white bg-white p-4 transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-[#F6F7FB] rounded-[2rem] overflow-hidden mb-6">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300 italic text-xs">No Image</div>
                  )}
                </div>

                {/* Content */}
                <div className="px-2 pb-2 grow flex flex-col">
                  <h2 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-violet-600 transition-colors line-clamp-1">
                    {p.name}
                  </h2>

                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-[10px] text-slate-400 font-bold ml-1">(4.8)</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-black text-slate-900 tracking-tight">
                      Rs.{p.price}
                    </span>
                    
                 
                    <AddToCartButton product={p} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}