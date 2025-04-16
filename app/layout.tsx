// CSS
import "@/styles/global.css";

// IMAGE
import ico from "@/images/favicon.ico";

export const metadata = {
  title: "RiceCall - 有趣的語音聊天平台",
  description: "RiceCall - 有趣的語音聊天平台",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <head>
        <link rel="icon" href={ico.src} sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
