// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AnnouncementListClient from "@/components/client_part/AnnouncementListClient";
import { getAnnouncementsByCategory } from "@/lib/data/announcements";

// Lib
import { getMetaData } from "@/lib/seoHelper";
import JsonLdInjector from "@/components/JsonLd";
import commonContent from "@/styles/common/content.module.css";
import mainStyles from "@/styles/announcement.module.css";

export const metadata = getMetaData({
  title: "官方公告",
  description:
    "查看 RC 語音平台的最新官方公告，獲取重要更新、活動資訊、系統維護通知以及平台政策變動等第一手消息。",
  keywords:
    "RC官方公告, RiceCall公告, RC語音更新, 平台資訊, RC最新消息, 米飯語音公告, RC重要通知, RC活動",
  url: "announcement",
});

export default async function AnnouncementPage() {
  const initialAnnouncements = await getAnnouncementsByCategory('綜合');

  return (
    <>
      <Header />
      <div className={`${commonContent["main"]} ${mainStyles["main"]}`}>
        <div className={`${commonContent["wrapper"]} ${mainStyles["wrapper"]}`}>
          <div className={`${commonContent["content"]} ${mainStyles["content"]}`}>
            <AnnouncementListClient
              initialAnnouncements={initialAnnouncements}
              currentCategory="綜合"
            />
          </div>
        </div>
      </div>
      <JsonLdInjector jsonLd={metadata.jsonLd} />
      <Footer />
    </>
  );
}
