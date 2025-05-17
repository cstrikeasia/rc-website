// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ContactusClientPart from "@/components/client_part/ContactusClientPart";

// Lib
import { getMetaData } from "@/lib/seoHelper";
import JsonLdInjector from "@/components/JsonLd";

const pageMetaOptions = {
  title: "聯繫我們",
  description: "聯絡 RC 語音開發團隊，快速解決您的問題！",
  keywords: "RC客服, RiceCall, 聯繫RC, RC官方, 米飯語音",
  url: "contactus",
  pageType: 'ContactPage' as const,
};

const { metadata: pageMetadata, jsonLd: pageJsonLd } = getMetaData({
  ...pageMetaOptions,
  pageType: 'WebPage' as const
});

export const metadata = pageMetadata;

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <ContactusClientPart />
      <JsonLdInjector jsonLd={pageJsonLd} />
      <Footer />
    </>
  );
}
