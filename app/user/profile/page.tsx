import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;
  const userId = cookieStore.get('userId')?.value;
  if (!userId || !token) {
    redirect('/login');
  }
  let userData = null;
  if (userId && token) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
        cache: 'no-store',
      });
      if (response.ok) {
        userData = await response.json();
      }
    } catch (error: any) {
      console.error("發生錯誤:", error);
    }
  }

  return (
    <>
      <Header />
      <ProfileClientPart userData={userData} />
      <JsonLdInjector jsonLd={pageJsonLd} />
      <Footer />
    </>
  );
}
