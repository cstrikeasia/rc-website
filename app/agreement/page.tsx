// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AgreementClientPart from "@/components/client_part/AgreementClientPart";

// Lib
import { getMetaData } from "@/lib/seoHelper";

export const metadata = getMetaData({
  title: "服務條款",
  description:
    "閱讀 RC 語音的服務條款，了解使用規範、隱私權政策與用戶權益，保障您在 RiceCall 平台上的安全與權利。",
  keywords:
    "RC服務條款, RiceCall使用規範, RC隱私政策, 米飯語音, 用戶權益, RC平台規定, RC法律聲明",
  url: "agreement",
});

export default function AgreementPage() {
  return (
    <>
      <Header />
      <AgreementClientPart />
      <Footer />
    </>
  );
}
