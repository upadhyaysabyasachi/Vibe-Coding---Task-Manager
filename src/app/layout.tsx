import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager - Created By Sabyasachi Upadhyay",
  description: "An intelligent task management application that leverages AI to help users break down complex tasks and generate daily plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t bg-white mt-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <span>Created by</span>
                <span className="font-semibold text-gray-900">Sabyasachi Upadhyay</span>
                <span className="text-red-500">♥</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>☕</span>
                <span>If you like it, please consider supporting:</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg px-4 py-2 border">
                <code className="text-sm font-mono text-gray-700">
                  UPI: sabyasachi.upadhyay4@okicici
                </code>
              </div>
              
              <p className="text-xs text-gray-400 max-w-md">
                
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}