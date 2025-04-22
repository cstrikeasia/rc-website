// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import JoinGroupClientPart from "@/components/client_part/JoinClientPart";
import JsonLdInjector from "@/components/JsonLd";

// Lib
import { getMetaData } from "@/lib/seoHelper";

export const metadata = getMetaData({
  title: "快速加入語音群",
  description:
    "立即透過邀請連結快速加入 RC 語音群組，與好友暢聊、組隊開黑、輕鬆管理公會語音頻道，RiceCall 為您打造最便利的語音社群體驗！",
  keywords:
    "RC語音群, RiceCall加入, RC邀請連結, 快速進入語音, RC公會語音, RC團隊聊天, 米飯語音, 語音頻道",
  url: "join",
});

export default function JoinGroupPage() {
  return (
    <>
      <Header />
      <JoinGroupClientPart />
      <JsonLdInjector jsonLd={metadata.jsonLd} />
      <Footer />
    </>
  );
}
