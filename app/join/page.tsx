"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, notFound } from "next/navigation";

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/joinGroup.module.css";

interface ReleaseData {
  url: string | null;
  version: string | null;
}

function checkIsMobile() {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(userAgent);
}

export default function JoinGroupPage() {
  const searchParams = useSearchParams();
  const serverId = searchParams.get("sid") || "";
  const [data, setData] = useState<ReleaseData | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const downloadUrl =
    data?.url || "https://github.com/NerdyHomeReOpen/RiceCall/releases";
  const label = data?.url ? `立即下載 v${data?.version || ""}` : "載入中...";
  useEffect(() => {
    setIsMobile(checkIsMobile());
    if (!serverId) return;
    const checkInstalled = () => {
      let hidden = false;
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          hidden = true;
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      const now = Date.now();
      window.location.href = `ricecall://join?serverId=${encodeURIComponent(
        serverId
      )}`;
      setTimeout(() => {
        const elapsed = Date.now() - now;
        if (!hidden && elapsed < 2000) {
          setIsAppInstalled(false);
        }
      }, 1500);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    };
    checkInstalled();
    const fetchData = async () => {
      try {
        const res = await fetch("/api/release");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("❌ 無法取得版本資料：", err);
        setData({ url: null, version: null });
      }
    };
    fetchData();
  }, [serverId]);
  if (isMobile) {
    return notFound();
  }
  return (
    <>
      <Header />
      <div className={`${content["main"]} ${main["main"]}`}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <div className={main["enterServer"]}>
            <h3>
              進入語音群ID: {encodeURIComponent(serverId) || 0}
              <br />
            </h3>
            {!serverId && (
              <p className={main["warningMessage"]}>
                <span>
                  serverId參數為空！<u></u>
                </span>
              </p>
            )}
            {!isAppInstalled && (
              <>
                <p className={main["warningMessage"]}>
                  <span>
                    未偵測到 RiceCall，請先安裝！<u></u>
                  </span>
                </p>
                <p className={content["downloadPC"]}>
                  <a href={downloadUrl} target="_blank" rel="noreferrer">
                    <i></i>
                    <strong>{label}</strong>
                  </a>
                </p>
              </>
            )}
            <ul>
              <li>
                <h5>Tips：</h5>
              </li>
              <li>
                1、如果無法自動啟動RC語音進入語音群，請檢查您是否正確安裝RC語音，您可以免費下載RC語音重灌，然後關閉瀏覽器再重新啟動瀏覽器打開語音群網址，請確保已經登入RC語音。
              </li>
              <li>
                2、如果您已經安裝了RC語音，還可以手動啟動RC語音，然後輸入語音群ID:
                <strong>{encodeURIComponent(serverId) || 0}</strong> 進入。
              </li>
              <li>
                3、如果您在使用過程中遇到什麼問題，可以進入
                <a href="https://discord.gg/adCWzv6wwS">Discord官方群組</a>
                尋找工作人員的幫助。
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
