import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";

export const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const nexonLv1Gothic = localFont({
  src: [
    {
      path: "../../../public/fonts/NEXON-Lv1-Gothic-OTF.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nexon-lv1-gothic",
  display: "swap",
});

export const fontVariables = [
  notoSansKR.variable,
  nexonLv1Gothic.variable,
] as const;

export const fontClasses = fontVariables.join(" ");
