// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import HomeClientPart from "@/components/client_part/HomeClientPart";
import JsonLdInjector from "@/components/JsonLd";

// Lib
import { getMetaData } from "@/lib/seoHelper";

const pageMetaOptions = {
  title: "有趣的語音聊天平台",
  description: "不僅僅是一個優秀的語音工具，還是一個有趣的遊戲社區。",
  keywords:
    "RC語音,RiceCall,RC官網下載,RC軟體,語音軟體,語音聊天,公會語音,團隊管理,團隊聊天,副本語音,多人語聊,語音聊天,團隊語音,遊戲語音,在線K歌,網路K歌,遊戲公會,網路教育",
  url: "",
  pageType: 'WebSite' as const,
};

const { metadata: pageMetadata, jsonLd: pageJsonLd } = getMetaData(pageMetaOptions);

export const metadata = pageMetadata;

export default function HomePage() {
  return (
    <>
      <Header />
      <HomeClientPart />
      <JsonLdInjector jsonLd={pageJsonLd} />
      <Footer />
    </>
  );
}
