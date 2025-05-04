// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SpecificationClientPart from "@/components/client_part/SpecificationClientPart";

// Lib
import { getMetaData } from "@/lib/seoHelper";
import JsonLdInjector from "@/components/JsonLd";

const pageMetaOptions = {
  title: "平台規範",
  description:
    "了解 RC 語音平台使用規範，保障良好交流環境，遵守群組管理、用戶行為與安全守則，打造健康有序的語音社群！",
  keywords:
    "RC語音, RiceCall, RC平台規範, RiceCall使用守則, RC語音群管理, 用戶行為準則, RC安全政策, 米飯語音, RC社群規範",
  url: "specification",
  pageType: 'WebPage' as const,
};

const { metadata: pageMetadata, jsonLd: pageJsonLd } = getMetaData(pageMetaOptions);

export const metadata = pageMetadata;

export default function SpecificationPage() {
  return (
    <>
      <Header />
      <SpecificationClientPart />
      <JsonLdInjector jsonLd={pageJsonLd} />
      <Footer />
    </>
  );
}
