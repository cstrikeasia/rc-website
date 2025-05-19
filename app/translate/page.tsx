// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import EmbedFrameClientPart from "@/components/client_part/EmbedFrameClientPart";
import JsonLdInjector from "@/components/JsonLd";

// Lib
import { getMetaData } from "@/lib/seoHelper";

const pageMetaOptions = {
  title: "網頁內容嵌入服務",
  description:
    "使用此頁面嵌入指定的網頁內容。您可以透過 URL 參數指定要嵌入的目標網址，例如 Twitch 或 YouTube 直播聊天室。",
  keywords:
    "RC語音, RiceCall, 嵌入服務, iframe, 網頁嵌入, Twitch嵌入, YouTube嵌入, 網址轉換",
  url: "translate",
  pageType: 'WebPage' as const,
};

const { metadata: pageMetadata, jsonLd: pageJsonLd } = getMetaData(pageMetaOptions);

export const metadata = pageMetadata;

export default function TranslatePage() {
  return (
    <>
      <Header />
      <EmbedFrameClientPart />
      <JsonLdInjector jsonLd={pageJsonLd} />
      <Footer />
    </>
  );
}
