"use client";
import React, { useEffect, useState } from "react";

// CSS
import content from "@/styles/common/content.module.css";
import home from "@/styles/home.module.css";

interface ReleaseData {
  url: string | null;
  version: string | null;
}

export default function HomePage() {
  // State
  const [data, setData] = useState<ReleaseData | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase(),
      )
    ) {
      setIsMobile(true);
    }
  }, []);

  const downloadUrl =
    data?.url || "https://github.com/NerdyHomeReOpen/RiceCall/releases";
  const label = isMobile
    ? "僅支援電腦版"
    : data?.url
      ? `立即下載 v${data?.version || ""}`
      : "載入中...";
  return (
    <>
      <div className={`${content["main"]} ${home["main"]}`}>
        <div className={`${content["wrapper"]} ${home["wrapper"]}`}>
          <div className={`${content["content"]} ${home["content"]}`}>
            <h1>不僅是多人遊戲語音工具</h1>
            <h2>還是有趣的遊戲社區</h2>
            <p className={content["downloadPC"]}>
              <a
                href={!isMobile ? downloadUrl : undefined}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                  }
                }}
                aria-disabled={isMobile}
                style={
                  isMobile
                    ? { pointerEvents: "none", opacity: 0.6, cursor: "not-allowed" }
                    : {}
                }
              >
                <i></i>
                <strong>{label}</strong>
              </a>
            </p>
          </div>
        </div>
        <div className={content["bgImage"]} />
      </div>
    </>
  );
}
