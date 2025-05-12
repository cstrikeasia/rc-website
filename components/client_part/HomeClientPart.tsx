"use client";
import React, { useEffect, useState } from "react";

// CSS
import content from "@/styles/common/content.module.css";
import home from "@/styles/home.module.css";
import DownloadComponents from "../DownloadComponents";
import { faLinux, faWindows, faApple } from "@fortawesome/free-brands-svg-icons";

interface ReleaseData {
  fileType: string;
  url: string | null;
  version: string | null;
}

interface ReturnedReleaseData {
  files: ReleaseData[];
}

export default function HomePage() {
  // State
  const [data, setData] = useState<ReleaseData[] | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [label, setLabel] = useState<string>("載入中...");
  const [downloadUrl, setDownloadUrl] = useState<string>("https://github.com/NerdyHomeReOpen/RiceCall/releases");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/release");
        const json = await res.json();
        setData(json?.files);
      } catch (err) {
        console.error("❌ 無法取得版本資料：", err);
        setData(null);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const platform = navigator.userAgentData?.platform.toLowerCase() || navigator.platform?.toLowerCase();
    if (platform.includes("win")) setPlatform("windows");
    else if (platform.includes("mac")) setPlatform("mac");
    else if (platform.includes("linux")) setPlatform("linux");
    else setIsMobile(true);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      let fileType = "";
      if (platform === "windows") {
        fileType = "exe";
      } else if (platform === "mac") {
        fileType = "dmg";
      } else if (platform === "linux") {
        fileType = "deb";
      } else if (isMobile) {
        fileType = "not_supported"
      } else {
        fileType = "not_supported"
      }

      console.log(fileType)

      const file = data.find((item) => item.fileType === fileType);

      console.log(file)

      if (file) {
        setDownloadUrl(file.url || "https://github.com/NerdyHomeReOpen/RiceCall/releases");
        setLabel(`立即下載 v${file.version || ""}`);
      } else {
        setDownloadUrl("https://github.com/NerdyHomeReOpen/RiceCall/releases");
        setLabel("您的平台目前不受支援");
      }
    }
  }, [data, isMobile, platform]);

  let getIcon = (platform: string | null) => {
    switch (platform) {
      case "windows":
        return faWindows;
      case "mac":
        return faApple;
      case "linux":
        return faLinux;
      default:
        return null;
    }
  }

  return (
    <>
      <div className={`${content["main"]} ${home["main"]}`}>
        <div className={`${content["wrapper"]} ${home["wrapper"]}`}>
          <div className={`${content["content"]} ${home["content"]}`}>
            <h1>不僅是多人遊戲語音工具</h1>
            <h2>還是有趣的遊戲社區</h2>
            <DownloadComponents
              downloadUrl={downloadUrl}
              label={label}
              isMobile={isMobile}
              content={content}
              icon={getIcon(platform)}
            />
          </div>
        </div>
        <div className={content["bgImage"]} />
      </div>
    </>
  );
}
