// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FAQClientPart from "@/components/client_part/FaqClientPart";
import JsonLdInjector from "@/components/JsonLd";

// Lib
import { getMetaData } from "@/lib/seoHelper";

export const metadata = getMetaData({
  title: "常見問題",
  description:
    "瀏覽 RC 語音的常見問題解答，快速了解帳號註冊、語音設定、下載安裝與故障排除，協助您輕鬆使用 RiceCall！",
  keywords:
    "RC常見問題, RiceCall幫助, RC語音設定, RC下載問題, RC帳號註冊, RC故障排除, 米飯語音",
  url: "faq",
});

export default function FAQPage() {
  return (
    <>
      <Header />
      <FAQClientPart />
      <JsonLdInjector jsonLd={metadata.jsonLd} />
      <Footer />
    </>
  );
}
