import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LottoPicture - AI 로또번호 생성기",
  description: "사진을 업로드하면 AI가 분석하여 행운의 로또번호를 생성해드립니다",
  keywords: ["로또", "AI", "인공지능", "로또번호", "로또픽처", "사진분석"],
  authors: [{ name: "LottoPicture Team" }],
  openGraph: {
    title: "LottoPicture - AI 로또번호 생성기",
    description: "사진을 업로드하면 AI가 분석하여 행운의 로또번호를 생성해드립니다",
    url: "https://lottopicture.shop",
    siteName: "LottoPicture",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LottoPicture - AI 로또번호 생성기",
    description: "사진을 업로드하면 AI가 분석하여 행운의 로또번호를 생성해드립니다",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          {/* Header */}
          <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    LottoPicture
                  </span>
                  <span className="text-sm text-gray-500">v2025</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    소개
                  </a>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    사용방법
                  </a>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    문의
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t bg-white/80 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">
                  © 2025 LottoPicture. All rights reserved.
                </p>
                <p className="text-xs">
                  본 서비스는 오락 목적으로만 제공되며, 실제 당첨을 보장하지 않습니다.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
