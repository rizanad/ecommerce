
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-[family-name:var(--font-jakarta)]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
          Orchid<span className="text-violet-600">.</span>Shop
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-50 py-10 px-6 shadow-sm sm:rounded-4xl border border-slate-100 sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}