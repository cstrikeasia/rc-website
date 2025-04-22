// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import RegisterClientPart from "@/components/client_part/RegisterClientPart";
import JsonLdInjector from "@/components/JsonLd";

// Lib
import { getMetaData } from "@/lib/seoHelper";

export const metadata = getMetaData({
  title: "註冊帳號",
  description:
    "免費註冊 RC 語音帳號，立即加入語音群組、認識新朋友、管理您的公會與團隊，開啟專屬於您的語音聊天新體驗！",
  keywords:
    "RC語音註冊, RiceCall免費加入, RC開通帳號, 米飯語音, RC公會管理, 語音聊天平台, RC新手加入",
  url: "register",
});

export default function RegisterPage() {
  return (
    <>
      <Header />
      <RegisterClientPart />
      <JsonLdInjector jsonLd={metadata.jsonLd} />
      <Footer />
    </>
  );
}
