// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProfileClientPart from "@/components/client_part/ProfileClientPart";
import JsonLdInjector from "@/components/JsonLd";

// Lib
import { getMetaData } from "@/lib/seoHelper";

const pageMetaOptions = {
  title: "個人中心",
  description:
    "管理您的 RC 語音帳號與個人資料，快速存取語音群組、好友名單與偏好設定，打造專屬的 RiceCall 語音體驗！",
  keywords:
    "RC語音個人中心, RiceCall設定, RC帳號管理, RC語音群組管理, RC好友, RC語音個人頁, RC偏好設定, 米飯語音控制台",
  url: "profile",
  pageType: "WebPage" as const,
};

const { metadata: pageMetadata, jsonLd: pageJsonLd } =
  getMetaData(pageMetaOptions);

export const metadata = pageMetadata;

export default function ProfilePage() {
  return (
    <>
      <Header />
      <ProfileClientPart />
      <JsonLdInjector jsonLd={pageJsonLd} />
      <Footer />
    </>
  );
}
