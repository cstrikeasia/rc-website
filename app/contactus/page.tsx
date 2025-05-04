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
  const contacts = [
    {
      title: "主開發",
      contact: "JoshHuang9508",
      info: [{ label: "Github", value: "https://github.com/JoshHuang9508/" }],
    },
    {
      title: "主開發",
      contact: "yeci226",
      info: [{ label: "Github", value: "https://github.com/yeci226/" }],
    },
    {
      title: "後端開發",
      contact: "lekoOwO",
      info: [{ label: "Github", value: "https://github.com/lekoOwO/" }],
    },
    {
      title: "前端開發",
      contact: "cablate",
      info: [{ label: "Github", value: "https://github.com/cablate/" }],
    },
    {
      title: "前端開發",
      contact: "cstrikeasia",
      info: [{ label: "Github", value: "https://github.com/cstrikeasia/" }],
    },
    {
      title: "前端開發",
      contact: "rytlebsk",
      info: [{ label: "Github", value: "https://github.com/rytlebsk/" }],
    },
    {
      title: "伺服器架設",
      contact: "Cooookie16",
      info: [{ label: "Github", value: "https://github.com/Cooookie16/" }],
    },
    {
      title: "伺服器架設",
      contact: "yayacat",
      info: [{ label: "Github", value: "https://github.com/yayacat/" }],
    },
  ];
  return (
    <>
      <Header />
      <ContactusClientPart />
      <JsonLdInjector jsonLd={pageJsonLd} />
      <Footer />
    </>
  );
}
