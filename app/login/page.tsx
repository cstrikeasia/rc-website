// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import LoginClientPart from "@/components/client_part/LoginClientPart";
import JsonLdInjector from "@/components/JsonLd";

// Lib
import { getMetaData } from "@/lib/seoHelper";

export const metadata = getMetaData({
  title: "登入",
  description:
    "登入 RC 語音帳號，立即管理您的語音群組、好友列表與個人設定，隨時隨地暢享高品質語音聊天體驗！",
  keywords:
    "RC語音登入, RiceCall帳號, RC會員登入, 語音群管理, RC好友列表, 米飯語音, RC個人設定",
  url: "login",
});

export default function LoginPage() {
  return (
    <>
      <Header />
      <LoginClientPart />
      <JsonLdInjector jsonLd={metadata.jsonLd} />
      <Footer />
    </>
  );
}
