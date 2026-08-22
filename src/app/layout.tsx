import type { Metadata } from "next";
import { Kantumruy_Pro, Montserrat } from "next/font/google";
import "./globals.css";

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-khmer",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-num",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ខ្ចីប្រាក់ iCloud – ខ្ចីប្រាក់រហ័ស រហូតដល់ 1000$ គ្រាន់តែមាន iPhone",
  description:
    "ខ្ចីប្រាក់រហ័សតាម iCloud iPhone រហូតដល់ 1000$ ទទួលប្រាក់ក្នុងថ្ងៃតែមួយ។ រហ័ស – ងាយស្រួល – សម្ងាត់។ គាំទ្រ iPhone 12 ឡើងទៅ។",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km" className={`${kantumruy.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
