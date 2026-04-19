
import { db } from "@/lib/db";
import { ShoppingBag, TrendingUp, Package, AlertCircle } from "lucide-react";

export default async function AdminDashboard() {
  const productCount = await db.product.count();
  
  const stats = [
    { label: "Total Revenue", value: "Rs. 1,24,500", icon: <TrendingUp className="text-emerald-500" />, trend: "+12%" },
    { label: "Active Orders", value: "48", icon: <ShoppingBag className="text-violet-500" />, trend: "8 new" },
    { label: "Total Products", value: productCount, icon: <Package className="text-blue-500" />, trend: "In stock" },
    { label: "Low Stock", value: "3", icon: <AlertCircle className="text-rose-500" />, trend: "Action required" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Welcome back, Admin.</h1>
        <p className="text-slate-400 text-sm font-medium mt-1">Here is what's happening with Orchid store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</h3>
            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-6">Recent Sales Activity</h2>
        <div className="text-center py-20 text-slate-300">
          <p className="text-sm font-bold italic">Sales data will populate as orders are placed.</p>
        </div>
      </div>
    </div>
  );
}