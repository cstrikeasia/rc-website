// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AnnouncementListClientPart from "@/components/client_part/AnnouncementListClientPart";
import { getAnnouncementsByCategory } from "@/lib/announcements/apiFetch";
import JsonLdInjector from "@/components/JsonLd";

// Lib
import { getMetaData } from "@/lib/seoHelper";
import { announcementBaseOptions } from '@/lib/announcements/metadataConfig';
import commonContent from "@/styles/common/content.module.css";
import mainStyles from "@/styles/announcement.module.css";

const pageMetaOptions = {
  title: announcementBaseOptions.baseTitle,
  description: announcementBaseOptions.description,
  keywords: announcementBaseOptions.keywords,
  url: announcementBaseOptions.baseUrlSegment,
  pageType: 'WebSite' as const,
};
const { metadata: pageMetadata, jsonLd: pageJsonLd } = getMetaData(pageMetaOptions);

export const metadata = pageMetadata;

export default async function AnnouncementPage() {
  const initialAnnouncements = await getAnnouncementsByCategory('綜合');
  return (
    <>
      <Header />
      <div className={`${commonContent["main"]} ${mainStyles["main"]}`}>
        <div className={`${commonContent["wrapper"]} ${mainStyles["wrapper"]}`}>
          <h1>官方公告</h1>
          <div className={`${commonContent["content"]} ${mainStyles["content"]}`}>
            <AnnouncementListClientPart
              initialAnnouncements={initialAnnouncements}
              currentCategory="綜合"
            />
          </div>
        </div>
      </div>
      <JsonLdInjector jsonLd={pageJsonLd} />
      <Footer />
    </>
  );
}
