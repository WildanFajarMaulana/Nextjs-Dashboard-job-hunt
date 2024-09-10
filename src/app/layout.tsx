import type { Metadata } from "next";
import "./globals.css";
import { Epilogue } from 'next/font/google'
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={epilogue.className}
      >
        <main>
          <div className="border-t">
            <div className="bg-background">
              <div className="flex flex-row">
                <div className="hidden lg:block w-[18%] border border-t">
                  <Sidebar />
                </div>
                <div className="col-span-3 overflow-auto lg:col-span-5 lg:border-1 w-full">
                  <div className="px-6 py-6 lg:px-8">
                    <Header />
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
