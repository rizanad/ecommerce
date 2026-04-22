import Link from "next/link";
import Image from "next/image";
import {
  Star, Smartphone, Watch,
  Gamepad2, ArrowRight,
  Sparkles, ShieldCheck,
  SportShoe,
  Laptop
} from "lucide-react";
import { db } from "@/lib/db";
import HeroSlideshow from "../components/HeroSlideShow";
import AddToCartButton from "@/components/cart/AddToCartButton";
import Navbar from "@/components/layout/Navbar";

const categories = [
  { name: "Phones", icon: Smartphone, color: "bg-blue-50 text-blue-600", slug: "phones" },
  { name: "Accessories", icon: Watch, color: "bg-emerald-50 text-emerald-600", slug: "accessories" },
  { name: "Laptops", icon: Laptop, color: "bg-violet-50 text-violet-600", slug: "laptop" },
  { name: "Shoes", icon: SportShoe, color: "bg-amber-50 text-amber-600", slug: "shoes" },
  { name: "Gaming", icon: Gamepad2, color: "bg-indigo-50 text-indigo-600", slug: "gaming" },
];

export default async function HomePage() {
  let products:any[] = [];
  try {
    products = await db.product.findMany({ take: 12, orderBy: { createdAt: 'desc' } });
  } catch (e) {
    console.error(e);
  }

  const slideshowProducts = products.slice(0, 3);
  const featuredProducts = products.slice(3);

  return (
    <>

      <Navbar />

      <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-violet-100">

        <section className="bg-[#F9F3F0] overflow-hidden">
          <HeroSlideshow products={slideshowProducts} />
        </section>

        <section id="categories" className="py-24 container mx-auto px-6 scroll-mt-24">
          <div className="flex flex-col items-center mb-16 space-y-3">
            <div className="flex items-center gap-2 text-violet-600 font-black text-[10px] uppercase tracking-[0.4em]">
              <Sparkles size={12} /> Curated Collections
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-center">Browse by Category</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={`/products?category=${cat.slug}`}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] border border-slate-50 bg-white transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-100 group-hover:-translate-y-2 group-hover:border-violet-100">
                  <div className={`p-4 rounded-2xl mb-4 transition-transform duration-500 group-hover:scale-110 ${cat.color}`}>
                    <cat.icon className="h-7 w-7" />
                  </div>
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors text-center">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-24 bg-[#F9F3F0]/40 rounded-[4rem] mx-4 lg:mx-10 mb-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-violet-600 font-black text-[10px] uppercase tracking-[0.3em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-600 animate-pulse" /> Our Products
                </div>
                <h2 className="text-4xl font-black tracking-tighter">Explore the Drop</h2>
              </div>
              <Link href="/products" className="group flex items-center gap-3 text-[11px] font-black tracking-[0.2em] text-slate-900 bg-white px-8 py-4 rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-900 hover:text-white transition-all duration-300">
                VIEW ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((p: any) => (
                <div key={p.id} className="group flex flex-col h-full bg-white rounded-[2.5rem] p-4 border border-white transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  <div className="aspect-square relative bg-[#F6F7FB] rounded-4xl overflow-hidden mb-6">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs font-bold uppercase tracking-widest">No Image</div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm">
                      NEW DROP
                    </div>
                  </div>

                  <div className="px-2 pb-2 grow flex flex-col">
                    <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-violet-600 transition-colors mb-2">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />)}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-900 tracking-tight">
                          Rs.{p.price}
                        </span>
                      </div>

                      {/* No more wrapper div here! Let the component handle it. */}
                      <AddToCartButton product={p} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FOOTER */}
        <footer className="bg-white pt-32 pb-12 border-t border-slate-50">
          <div className="container mx-auto px-6">
            {/* ... existing footer structure ... */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
              <div className="lg:col-span-4 space-y-8">
                <h3 className="text-3xl font-black tracking-tighter">ORCHID<span className="text-violet-600">.</span></h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  We craft high-performance essentials for the modern digital native. Merging technical innovation with minimalist aesthetics.
                </p>
              </div>

              <div className="lg:col-span-2 space-y-6 text-sm font-bold text-slate-400">
                <h4 className="text-slate-900 uppercase text-[11px] tracking-widest">Catalogue</h4>
                <ul className="space-y-4">
                  <li><Link href="/products" className="hover:text-violet-600">All Products</Link></li>
                  <li><Link href="/" className="hover:text-violet-600">New Arrivals</Link></li>
                </ul>
              </div>

              <div className="lg:col-span-2 space-y-6 text-sm font-bold text-slate-400">
                <h4 className="text-slate-900 uppercase text-[11px] tracking-widest">Support</h4>
                <ul className="space-y-4">
                  <li><Link href="/" className="hover:text-violet-600">Help Center</Link></li>
                  <li><Link href="/" className="hover:text-violet-600">Shipping & Returns</Link></li>
                </ul>
              </div>

              <div className="lg:col-span-4 bg-slate-50 p-10 rounded-[2.5rem] space-y-6">
                <h4 className="font-black text-slate-900">Join the Inner Circle</h4>
                <div className="relative">
                  <input type="text" placeholder="Email" className="w-full bg-white px-6 py-4 rounded-2xl text-sm outline-none border border-slate-100" />
                  <button className="absolute right-2 top-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black">JOIN</button>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-emerald-500" /> Secure Subscription
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <p>© 2026 ORCHID RETAIL STUDIO. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-8">
                <span>Privacy</span>
                <span>Terms</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}