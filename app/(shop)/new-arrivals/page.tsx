import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { db } from "../../../lib/db";
import AddToCartButton from "../../../components/cart/AddToCartButton";

async function getNewArrivals() {
  const products = await db.product.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return products;
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="relative z-10 text-center space-y-4 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles size={14} /> Latest Drops
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            New In<span className="text-violet-500">.</span>
          </h1>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Arrivals</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Directly from the workshop</p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {products.length} Exclusive Items
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[4/5] bg-slate-50 rounded-[2.5rem] overflow-hidden mb-6 border border-transparent transition-all hover:border-violet-100">
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-violet-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-200">
                    New
                  </span>
                </div>
                
                <Image 
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-contain p-12 group-hover:scale-110 transition-transform duration-700"
                />

               <div className="absolute bottom-6 right-6 z-20">
  <AddToCartButton product={JSON.parse(JSON.stringify(product))} />
</div>
              </div>

              <div className="flex justify-between items-start px-2">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-violet-600 uppercase tracking-widest">{product.category}</p>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{product.name}</h3>
                </div>
                <p className="text-lg font-black text-slate-900">Rs. {product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/products" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 border-b-2 border-slate-100 hover:border-violet-600 pb-2 transition-all">
            View All Collection
          </Link>
        </div>
      </main>
    </div>
  );
}