// CSS
import "@/styles/global.css";

export const metadata = {
  title: "ricecall - 有趣的直播社區",
  description: "ricecall - 有趣的直播社區",
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
