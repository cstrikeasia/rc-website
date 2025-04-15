import React from "react";

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// CSS
import content from "@/styles/common/content.module.css";

// IMAGE
import apple from "@/images/code_apple.png";
import android from "@/images/code_android.png";
import img from "@/images/img.png";

export default function HomePage() {
  // const downloadLinks = [
  //   {
  //     label: "App Store",
  //     imgSrc: apple.src,
  //     className: content["apple"],
  //     href: "https://github.com/NerdyHomeReOpen/RiceCall/releases",
  //   },
  //   {
  //     label: "安卓下載",
  //     imgSrc: android.src,
  //     className: content["android"],
  //     href: "https://github.com/NerdyHomeReOpen/RiceCall/releases",
  //   },
  // ];
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
            <a
              href="https://github.com/NerdyHomeReOpen/RiceCall/releases"
              target="_blank"
              rel="noreferrer"
            >
              <i></i>
              <strong>立即下載</strong>
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
