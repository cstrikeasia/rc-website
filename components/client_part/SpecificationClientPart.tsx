"use client";
import React from "react";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/specification.module.css";

export default function SpecificationPage() {
  const rules = [
    "RC全平台使用者享有言論自由及平台賦予的各項基本權利，同時也必須嚴格遵守本規範及「RC語音」服務條款；",
    "禁止帶有色情性、政治性、宗教性、有組織性、商業性、危害平台安全等不法或擦邊的行為；",
    "禁止以任何形式發布虛假的、騷擾性的、搗亂性的、中傷他人的、辱罵性的、恐嚇性的、庸俗淫穢...等不當或擦邊的言論內容；",
    "禁止任意在語音群內喧嘩、刷頻、發廣告、發不法圖片或不法連結等，引發私人糾紛，給廣大使用者造成使用困擾；",
    "禁止盜用他人帳號及對語音群頻道進行不法操作；",
    "禁止買賣任何平台帳號、外掛、平台產品內相關資訊；",
    "禁止以任何形式宣傳其他同類平台（包括但不限於娛樂直播類平台、遊戲類平台、唱歌類平台、語音工具等）；",
    "RC使用者應尊重他人智慧財產(含著作、專利、商標、商業秘密)，若明確存在侵犯他人智慧財產，除非您擁有或已得到所有必要的許可。否則RC官方有權不告知撤除；",
    "禁止冒用RC官方名義對用戶或語音群進行管理，RC官方人員必有配戴RC官方徽章；",
    "切勿意圖實施或宣揚攻擊RC官方，擾亂客服或平台正常營運；",
  ];
  return (
    <>
      <div className={`${content["main"]} ${main["main"]}`}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <h1>平台使用規範</h1>
          <div className={`${content["content"]} ${main["content"]}`}>
            <p>
              為營造健康清新有意義的網路平台環境和保障使用者使用本公司提供之「RC
              語音軟體」線上語音服務及旗下產品的相關權益，請於註冊帳號及使用本服務前，詳細閱讀以下規範。
            </p>
            <ol>
              {rules.map((rule, index) => (
                <li key={index}>
                  <strong>
                    <p>{`${index + 1}. ${rule}`}</p>
                  </strong>
                </li>
              ))}
            </ol>
            <p>
              本規範適用於RC全平台範圍及旗下產品，包含帳號、個人檔案、語音群、訊息等。
              我們無法默視以上違規使用行為，一經查證屬實，將不告知立即凍結違規的RC帳號、語音群。
              打擊違規使用RC語音，需要所有使用者齊心協力，共同維護我們乾淨清新的語音使用環境。
            </p>
            <p>
              「RC語音」歡迎使用者發現違規行為進行舉報，舉報證據請使用電子信箱發送至：
              <a href="mailto:support@ricecall.com.tw">
                support@ricecall.com.tw
              </a>
            </p>
            <p>RC官方保留所有規範的解釋權，以上規範將不定期更新</p>
          </div>
        </div>
      </div>
    </>
  );
}
