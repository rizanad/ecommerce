import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users,  
  ExternalLink
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { label: "Products", icon: <Package size={20} />, href: "/admin/products" },
    { label: "Orders", icon: <ShoppingBag size={20} />, href: "/admin/orders" },
    { label: "Customers", icon: <Users size={20} />, href: "/admin/users" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0">
        <div className="p-8">
          <Link href="/admin" className="text-xl font-black text-white tracking-tighter">
            ORCHID<span className="text-violet-500">.</span>ADMIN
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all font-bold text-sm"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-600/10 text-violet-400 hover:bg-violet-600 hover:text-white transition-all font-bold text-sm"
          >
            <ExternalLink size={20} />
            View Live Site
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  );
}