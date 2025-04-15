// CSS
import "@/styles/global.css";

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
      <body>{children}</body>
    </html>
  );
}
