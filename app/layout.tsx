import { ReactNode } from "react";
import Script from "next/script";
import { cookies } from 'next/headers';

// Context
import { AuthProvider } from "@/context/AuthContext";

// CSS
import "@/styles/global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const token = "GTM-PTPD9MPK";
  const cookieStore = cookies();
  const initialToken = cookieStore.get('authToken')?.value;
  const initialUserId = cookieStore.get('userId')?.value;

  return (
    <html lang="zh-Hant">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        {/** Google Tag Manager **/}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${token}');
          `}
        </Script>
      </head>
      <body>
        {/** Google Tag Manager noscript **/}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${token}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AuthProvider initialToken={initialToken} initialUserId={initialUserId}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
