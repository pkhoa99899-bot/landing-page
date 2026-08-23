import type { Metadata } from "next";
import { Kantumruy_Pro, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GOOGLE_ADS_ID = "AW-18398302220";
const FACEBOOK_PIXEL_ID = "1722101222442522";

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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '${FACEBOOK_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </html>
  );
}
