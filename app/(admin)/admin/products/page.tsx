import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10 
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Products</h1>
          <p className="text-slate-500 font-medium">Manage your inventory and product details.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-violet-600 transition-all"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50 bg-slate-50/50">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Image</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Product Details</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((product:any) => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 relative overflow-hidden mx-auto">
                    <Image src={product.imageUrl} alt="" fill className="object-contain p-2" />
                  </div>
                </td>
                <td className="p-6">
                  <p className="font-bold text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-400 truncate max-w-50">{product.description}</p>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-[10px] font-black uppercase">
                    {product.category}
                  </span>
                </td>
                <td className="p-6 font-bold text-slate-900">Rs. {product.price}</td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Edit size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}