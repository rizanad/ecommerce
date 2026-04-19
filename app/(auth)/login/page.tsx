"use client";

import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function UserLoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Welcome back!</h1>
        <p className="text-sm text-slate-500 mt-1">Please enter your details to sign in.</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input type="email" placeholder="you@example.com" className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 ring-violet-100 transition-all text-sm font-medium" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 ring-violet-100 transition-all text-sm font-medium" />
          </div>
        </div>

        <button type="submit" className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-lg shadow-violet-100">
          Sign In <ArrowRight size={18} />
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link href="/signup" className="text-violet-600 font-bold hover:underline">Sign up</Link>
      </p>
    </div>
  );
}