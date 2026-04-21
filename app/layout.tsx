import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/providers/SessionProviders";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta", 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        <AuthProvider>

        {children}
        <Toaster position="top-center"/>
        </AuthProvider>
      </body>
    </html>
  );
}