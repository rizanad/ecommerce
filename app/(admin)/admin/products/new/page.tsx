
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default function NewProductPage() {
  async function createProduct(formData: FormData) {
    "use server"; 

    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const category = formData.get("category") as string;

    await db.product.create({
      data: { name, price, description, imageUrl, category, stock: 50 }
    });

    redirect("/admin/products"); 
  }

  return (
    <div className="p-10 max-w-4xl">
      <h1 className="text-3xl font-black mb-8">Add New Product</h1>
      
      <form action={createProduct} className="grid grid-cols-2 gap-6 bg-white p-8 rounded-4xl shadow-sm border border-slate-100">
        <div className="col-span-2 flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-slate-400">Product Name</label>
          <input name="name" className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200" placeholder="e.g. Nike Air Max" required />
        </div>

        <div className="col-span-1 flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-slate-400">Price (Rs.)</label>
          <input name="price" type="number" className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200" placeholder="0.00" required />
        </div>

        <div className="col-span-1 flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-slate-400">Category</label>
          <select name="category" className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200">
            <option value="shoes">Shoes</option>
            <option value="phones">Phones</option>
            <option value="laptops">Laptops</option>
          </select>
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-slate-400">Description</label>
          <textarea name="description" rows={5} className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200" placeholder="Enter full details..." required />
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-slate-400">Image URL</label>
          <input name="imageUrl" className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-violet-200" placeholder="https://..." required />
        </div>

        <button type="submit" className="col-span-2 bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-violet-600 transition-all">
          Publish Product
        </button>
      </form>
    </div>
  );
}