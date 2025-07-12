import type { Metadata } from "next";
import "./(app)/styles/globals.css";
import "./(app)/styles/tailwind.css";
import { fontClasses } from "@/shared/fonts";
import { AppProvider } from "./(app)/providers";
import { Toast } from "@/shared/ui/toast";
import { Navigation } from "@/widgets/navigation";

// 기본 메타 태그
export const metadata: Metadata = {
  title: {
    default: "FCDB | FC 온라인 전적 검색",
    template: "%s | FCDB",
  },
  description:
    "FC 온라인 전적, 선수 정보, 매치 히스토리, 팀 전술 등 다양한 정보를 확인할 수 있는 플랫폼입니다.",
  keywords: [
    "FCDB",
    "FC 온라인",
    "전적 검색",
    "FC온라인 전적",
    "선수 정보",
    "스쿼드",
    "FC Online",
    "FIFA 온라인",
  ],
  authors: [{ name: "FCDB Team", url: "https://fcdb.co.kr" }],
  creator: "FCDB",
  publisher: "FCDB",
  metadataBase: new URL("https://fcdb.co.kr"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "FCDB - FC 온라인 전적 검색",
    description:
      "FC 온라인 유저의 전적, 선수 통계, 스쿼드 분석 등 모든 정보를 제공합니다.",
    url: "https://fcdb.co.kr",
    siteName: "FCDB",
    // images: [
    //   {
    //     url: "https://fcdb.co.kr/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "FCDB - FC 온라인 전적 검색",
    //   },
    // ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FCDB - FC 온라인 전적 검색",
    description: "전적, 선수, 스쿼드까지 FC 온라인의 모든 데이터를 한눈에!",
    images: ["https://fcdb.co.kr/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  themeColor: "#2b2b2b",
  category: "게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${fontClasses}`}>
      <body>
        <AppProvider>
          <Navigation />
          {children}
        </AppProvider>
        <Toast position="top-right" />
      </body>
    </html>
  );
}
