// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SpecificationClientPart from "@/components/client_part/SpecificationClientPart";

// Lib
import { getMetaData } from "@/lib/seoHelper";
import JsonLdInjector from "@/components/JsonLd";

export const metadata = getMetaData({
  title: "平台規範",
  description:
    "了解 RC 語音平台使用規範，保障良好交流環境，遵守群組管理、用戶行為與安全守則，打造健康有序的語音社群！",
  keywords:
    "RC平台規範, RiceCall使用守則, RC語音群管理, 用戶行為準則, RC安全政策, 米飯語音, RC社群規範",
  url: "specification",
});

export default function SpecificationPage() {
  return (
    <>
      <Header />
      <SpecificationClientPart />
      <JsonLdInjector jsonLd={metadata.jsonLd} />
      <Footer />
    </>
  );
}
