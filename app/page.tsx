"use client";
import React, { useEffect, useState } from "react";

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// CSS
import content from "@/styles/common/content.module.css";

interface ReleaseData {
  url: string | null;
  version: string | null;
}

export default function HomePage() {
  const [data, setData] = useState<ReleaseData | null>(null);
  useEffect(() => {
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
  }, []);
  const downloadUrl =
    data?.url || "https://github.com/NerdyHomeReOpen/RiceCall/releases";
  const label = data?.url ? `立即下載 ${data?.version || ""}` : "載入中...";
  return (
    <>
      <Header />
      <div className={content["main"]}>
        <div className={content["bgImageBox"]}>
          <div className={content["bgImage"]} />
        </div>
        <div className={content["wrapper"]}>
          <h1>不僅是多人遊戲語音工具</h1>
          <h2>還是有趣的遊戲社區</h2>
          <p className={content["downloadPC"]}>
            <a href={downloadUrl} target="_blank" rel="noreferrer">
              <i></i>
              <strong>{label}</strong>
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
