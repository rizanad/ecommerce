"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Hardcoded Admin Credentials
    const ADMIN_EMAIL = "admin@orchid.com";
    const ADMIN_PASSWORD = "password123";

    // Simulate a brief network delay for realism
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Set a simple cookie for the middleware to read
        document.cookie = "admin_session=true; path=/";
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid credentials. Access denied.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex items-center justify-center p-6 font-[family-name:var(--font-jakarta)]">
      <div className="w-full max-w-[400px]">
        {/* Logo/Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-2xl shadow-slate-200">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Orchid<span className="text-violet-600">.</span>Admin
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
            Secure Management Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-100/50">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Admin Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-violet-200 focus:ring-4 ring-violet-50 transition-all font-bold text-sm"
                  placeholder="admin@orchid.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-violet-200 focus:ring-4 ring-violet-50 transition-all font-bold text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100">
                <AlertCircle size={16} />
                <p className="text-[10px] font-bold uppercase tracking-wider">{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-violet-600 disabled:bg-slate-300 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 mt-2"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          &copy; 2026 Orchid Systems Ltd.
        </p>
      </div>
    </div>
  );
}