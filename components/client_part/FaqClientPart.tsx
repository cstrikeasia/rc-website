"use client";
import React, { useState, useEffect, JSX } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Components
import { parseLine } from "@/components/parseHtmlLine";
import LevelTable from "@/components/LevelTable";
import ServerLevelTable from "@/components/ServerLevelTable";

// CSS
import content from "@/styles/common/content.module.css";
import common from "@/styles/common/common.module.css";
import main from "@/styles/faq.module.css";

export default function FAQClientPart() {
  const pathname = usePathname();

  const menu = [
    { label: "熱點問題", key: "hot" },
    { label: "帳號相關", key: "account" },
    { label: "RC好友功能", key: "im" },
    { label: "RC群功能相關", key: "server" },
    { label: "RC群語音頻道", key: "channel" },
    { label: "語音設定相關", key: "voice" },
    { label: "VIP會員相關", key: "vip" },
  ];

  // 這裡直接放置 faqs 資料，為簡化示範
  const faqs = {
    hot: [
      {
        question: "如何增加個人的經驗值？",
        answer: [
          "個人的經驗值是根據在線時長來計算的。登入RC後，每在線一個小時增加一個積分，每天增加的積分最高上限為24，不足一小時的部分會累積到下一次的計算。系統每天更新一次積分，時間為每日的上午8時。如遇突發情況導致在當日的8時積分未更新，未加的積分會累積到第二天的更新。",
        ],
      },
      {
        question:
          "登入RC時彈出提示[伺服器連結失敗,請檢查您的網路連接!]，怎麼辦？",
        answer: [
          "伺服器連結失敗的主要原因如下：",
          "◎ 網路連接速度",
          "◎ 某些防火牆阻止了RC語音",
          "解決方案：",
          <span>
            ◎
            測試檢查您的網路連接速度，如果是因為網路問題，請自行對網路連接速度進行改善，或詢問您的ISP業者。推薦一個測試網速的連結：
            <Link href="https://fast.com/zh/tw/">
              <span>https://fast.com/zh/tw/</span>
            </Link>
            。
          </span>,
          "◎ 如網路無問題，請檢測電腦中是否安裝了防火牆，如果安裝了防火牆，請更改相應的阻擋設置或將防火牆關閉。根據大多數使用者的反應，主要問題是由於Nvidia主控台的防火牆Network Access Manager所引起的。若電腦中有Network Access Manager這個程式的話，請將它移除，重啟電腦后問題即可解決。",
        ],
      },
      {
        question: "聽不到別人講話/別人聽不到我講話？",
        answer: [
          "假如您聽不到別人講話，請按以下步驟檢查問題：",
          "◎ 首先檢查自己的耳麥是否插好；",
          "◎ 耳麥是否正常可以使用：",
          "可以使用RC系統中的語音檢測功能進行檢測。請點視窗左上方的RC語音-->系統設定-->音頻設定-->語音設備調節設定。",
          "◎ 檢查選擇的設備是否正確：",
          "◆ 如果您聽不到聲音，請檢查輸出裝置：點擊RC視窗左上角的 RC語音--系統設定--音頻設定，更改輸出裝置。",
          "◆ 如果別人聽不到您的聲音，則需要更改輸入裝置。",
          <Image
            src="/images/5-9.jpg"
            height={500}
            width={610}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "語音有雜訊怎麼辦？",
        answer: [
          "◎ 檢查耳麥是否插好: 有些電腦的耳麥插頭比較容易鬆動，請使用者自行調整。",
          "◎ 檢查使用別的聊天軟體是否也有雜訊: 有些音效卡和耳麥本身就會有很多雜訊，如果檢查到別的軟體也會有雜訊，就得請電腦工程師查看問題。",
          "◎ 網路不穩定: 建議在使用RC語音的時候不要下載東西和開PPS，因為這會很佔網路。",
        ],
      },
      {
        question: "好友數量及收藏的語音群數量上限說明",
        answer: [
          "為了讓您擁有一個更好更穩定的程式使用環境，同時也為了讓伺服器更加穩定，軟體更加輕量，我們對有些功能做了數量上的限制，在將來也會視情況做相關的調整。",
          "目前的上限設置如下：",
          "我能加入的語音群上限：150個",
          "好友上限：500人",
          "收藏的語音群上限：100個",
        ],
      },
      {
        question: "更換圖像失敗怎麼辦？",
        answer: [
          "◎ 系統默認的圖像最大值為4M，如果您上傳的圖像大小超過這個值，可能會導致上傳不成功，建議您更換一張大小合適的圖像。",
          "◎ 如果顯示已上傳成功，但個人資料中的圖像無變化，建議您清空RC目錄下的Imagecache資料夾后重啟RC，或清理IE瀏覽器的暫存檔。步驟：打開IE瀏覽器>工具>網際網路選項>一般>刪除瀏覽歷程紀錄。",
          "◎ 如果上傳不成功，或提示上傳失敗，可能是由於系統出錯，請您及時聯繫我們回報問題。",
        ],
      },
      {
        question: "RC中的圖像顯示空白怎麼辦？",
        answer: [
          "如果圖像顯示空白，包括語音群圖像、個人大頭貼和好友大頭貼，我們建議你清空RC安裝目錄下的imagecache資料夾後重啟RC。或者重新安裝程式，安裝路徑中不要存在中文。如原來路徑：C:Program FilesRC語音，可改為：C:Program FilesRC。",
        ],
      },
      {
        question: "程式頓的解決方法？",
        answer: [
          "若您的電腦配置相對較低，在使用RC的過程中可能會有頓頓的感覺，CPU佔用率也相對較高。為使整個程式運行更佳，我們建議您啟用RC時在系統設定中關閉回音消除功能。",
        ],
      },
    ],
    account: [
      {
        question: "怎麼安装RC語音程式？",
        answer: [
          <span>
            如果你的電腦上已安裝其它舊版的RC語音客戶端，打開程式後，系統會自動更新為最新版本。如果你的電腦上沒有RC語音程式，請到
            <Link href="https://github.com/NerdyHomeReOpen/RiceCall/releases">
              <span>下載頁面</span>
            </Link>
            下載安裝最新版本。
          </span>,
        ],
      },
      {
        question: "怎麼取得RC語音帳號？",
        answer: [
          "◆ 如果你已經安裝好RC語音0.1.5程式，請打開程式，點擊登錄視窗左下方的‘註冊帳號’進入申請頁面；",
          <Image
            key="signup-img"
            src="/images/1-1.png"
            height={500}
            width={610}
            alt={"RaidCall 註冊畫面"}
          />,
          // <span>
          //   ◆ 你也可以直接訪問
          //   <Link href="/signup">
          //     <span>申請頁面</span>
          //   </Link>
          //   註冊帳號
          // </span>,
        ],
      },
      {
        question: "如何登入RC 語音？",
        answer: [
          "打開程式，輸入你的RC帳號和密碼，然後點擊登入，即可來到屬於我們大家的RC語音世界！",
          <Image
            src="/images/1-2.png"
            height={450}
            width={610}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何重設密碼？",
        answer: [
          "如果您忘記密碼或希望重設一個新的密碼，可通過以下方式重設：",
          "◎ 打開RC程式，在登錄視窗的右下方點[忘記密碼]，進入找回密碼頁面後，根據提示重設密碼；",
          <Image
            src="/images/1-3.png"
            height={450}
            width={610}
            alt={"RaidCall"}
          />,
          // <span>
          //   ◎ 直接訪問
          //   <Link href="/forget">
          //     <span>找回密碼</span>
          //   </Link>
          //   連結，按照提示重設您的密碼。
          // </span>,
        ],
      },
      {
        question: "如何增加個人的經驗值？",
        answer: [
          "個人的經驗值是根據在線時長來計算的。登錄RC後，每在線一個小時增加一個積分，每天增加的積分最高上限為24，不足一小時的部分會累積到下一次的計算。系統每天更新一次積分，時間為每日的上午8時。如遇突發情況導致在當日的8時積分未更新，未加的積分會累積到第二天的更新。",
        ],
      },
      {
        question: "等級與積分的轉換關系",
        answer: [
          "等級越高，所需要的經驗值越高。不同的等級，所對應的圖標不一樣。具體如下：",
          <LevelTable />,
        ],
      },
      {
        question: "登入逾時的問題",
        answer: [
          "登入超過時間引起問題的主要原因如下：",
          "◎ 網路連接速度",
          "◎ 某些防火牆阻止了RC語音",
          "解決方案：",
          "◎ 測試檢查您的網路連接速度，如果是因為網路問題，請自行對網路連接速度進行改善， 或詢問您的ISP業者。",
          "◎ 如網路無問題，請檢測電腦中是否安裝了防火牆，如果安裝了防火牆，請更改相應的阻擋設置或將防火牆關閉。根據大多數使用者的反應，主要問題是由於Nvidia主控台的防火牆Network Access Manager所引起的。 若電腦中有Network Access Manager這個程式的話，請將他移除掉，問題就可以解決了!! (打開控制台→新增/移除程式→NVIDIA ForceWare Network Access Manager→移除後再開啟RC語音即可!!)",
        ],
      },
      // {
      //   question: "我需要重設密碼，但註冊信箱收不到系統發送的信件怎麼辦？",
      //   answer: [
      //     <span>
      //       有些信箱系統會自動過濾一些未知的E-mail，如果垃圾信箱裡也沒有找到RC系統發送的密碼重設信件，請使用您注冊帳號時所填寫的信箱發送一封E-mail到
      //       <Link href="mailto:jasper888@ricecall.com">
      //         <span>jasper888@ricecall.com</span>
      //       </Link>
      //       ，並附上您的帳號、新的信箱地址和更改申請，我們會第一時間為你處理。
      //     </span>,
      //   ],
      // },
      // {
      //   question: "如何禁用/開啟事件提示音？",
      //   answer: [
      //     "請點擊RC視窗左上方的 RC 語音—系統設定—聲音提醒。",
      //     "如果您要禁用事件提示聲音，請勾選禁用所有音效提示即可。如果要開啟，取消勾選即可。",
      //     <Image
      //       src='/images/1-4.jpg'
      //       width={610}
      //       alt={"RaidCall"}
      //     />,
      //   ],
      // },
      {
        question: "如何禁用/開啟事件提示音？",
        answer: [
          "請點擊RC視窗左上方的 RC 語音—系統設定—聲音提醒。",
          "如果您要禁用事件提示聲音，請勾選禁用所有音效提示即可。如果要開啟，取消勾選即可。",
        ],
      },
      {
        question: "什麼是綁定手機號？什麼是密保手機號？",
        answer: [
          "-綁定手機號：可用於秀場用戶手機號登入和重置密碼，一個手機號只能綁定一個RC帳號。",
          "-密保手機號：僅用於重置RC帳號密碼的手機號，不能作為手機號碼登入，一個手機號可作為5個RC帳號的密保手機。",
        ],
      },
      {
        question: "怎麼設置&修改綁定手機號？怎麼設置&修改密保手機？",
        answer: [
          "--設置&修改綁定手機號：在RC語音“個人中心-密保管理”或在直播APP“我-設置”里可設置和修改綁定手機號。",
          "--設置&修改密保手機號：在RC語音“個人中心-密保管理”里可以設置和修改密保手機號。",
        ],
      },
      {
        question: "帳號的綁定手機和密保手機的同步規則",
        answer: [
          "-設置或修改綁定手機時，會同步為密保手機",
          "-設置或修改密保手機時，如果帳號的綁定手機為空且密保手機號未綁定過RC帳號則會同步為綁定手機；反之則不同步。",
        ],
      },
    ],
    im: [
      {
        question: "怎樣新增好友？",
        answer: [
          "新增好友的方式有三種：",
          "◆ 如果你已知道好友的帳號，請打開RC視窗，選擇“好友”，點擊視窗下方的‘添加好友’，在彈出框中輸入好友帳號（如apple），點擊搜尋即可申請添加好友；",
          <Image
            src="/images/2-1.png"
            height={500}
            width={640}
            alt={"RaidCall"}
          />,
          "◆ 在語音群的玩家列表中點選一個玩家，按右鍵點選‘添加好友’。",
          <Image
            src="/images/2-2.png"
            height={500}
            width={640}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "移除和封鎖有什麽用？",
        answer: [
          "移除好友：將好友從自己的好友列表中移除，自己仍在對方的好友列表中，仍能互發消息；",
          "封鎖好友：即拒絕接收好友的所有信息，包括好友申請。在解除封鎖前，無法收到被封鎖好友發來的任何消息，並且自己的狀態在對方的列表中顯示為離線。 ",
        ],
      },
      {
        question: "如何設定個人隱私？",
        answer: [
          "◎ 打開RC視窗，用滑鼠點擊視窗左上角的RC語音，點選‘系統設定’— ‘隱私設定’。",
          <Image
            src="/images/2-3.jpg"
            height={500}
            width={610}
            alt={"RaidCall"}
          />,
          <Image
            src="/images/2-9.jpg"
            height={500}
            width={610}
            alt={"RaidCall"}
          />,
          "◎ 將滑鼠移到桌面右下角工作列表的RC圖標，按右鍵選擇‘設定’。 ",
        ],
      },
      {
        question: "如何傳送檔案？",
        answer: [
          "在密語視窗中，若已互加好友，則可進行檔案傳送。點擊密語視察左上方的「檔案」，選取電腦中的檔案後點擊「開啟」，即可與好友實現檔案傳送。",
          <Image
            src="/images/2-5.jpg"
            height={500}
            width={610}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何查看訊息記錄？",
        answer: [
          "目前的訊息記錄保存僅限於密語聊天和會員群組聊天。查看方式有以下兩種：",
          <Image
            src="/images/2-6.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
          "◎ 點擊好友密語視窗中的訊息記錄，可查看個人和群組訊息記錄。",
          <Image
            src="/images/2-7.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
          <Image
            src="/images/2-8.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何設定不向好友共享我所在的語音頻道？",
        answer: [
          "通過視窗左上角的RC語音>系統設定>隱私設定，取消勾選[向好友共享我所在的群]。",
          <Image
            src="/images/2-9.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "什麼是個人財富值？",
        answer: [
          "個人的財富值是您在RC的成長貨幣，單位為“銀豆”；",
          "為了保障您帳號的安全，個人的財富值只能本人查看；",
          "目前可以通過在線時長獲得銀豆，後期銀豆可用來兌換遊戲福袋中的禮包等；",
          "1小時=1銀豆，未滿一小時的部份累計到下一次在線時長中計算。",
        ],
      },
      {
        question: "RC平臺徽章介紹",
        answer: [
          "h6:● 什麼是RC平臺徽章？",
          "平臺徽章體現用戶在RC平臺成長過程中獲得的榮譽及成就。",
          "h6:● 如何獲得平臺徽章？",
          "徽章是用戶通過完成RC平臺指定的活動任務所得，完成活動中所設定的任務即可領取平臺勳章，活動當中會設有超高難度的榮譽任務，完成任務會有機會獲得稀有性較高的平臺徽章。",
          "h6:● 平臺徽章的類別有哪些？",
          "RC平臺目前徽章類別有三種：活動徽章、應用徽章、認證徽章；",
          "活動徽章：通過RC平臺的活動（遊戲、娛樂）所得；",
          "應用徽章：通過開通RC語音新產品服務所獲得的徽章；",
          "認證徽章：通過RC語音平臺對名人用戶進行真實身份的確認，名人範圍支援K歌娛樂、體育、傳媒、人文藝術、遊戲、動漫、旅遊、時尚等領域知名人士的認證申請；",
          "h6:● 平臺徽章在哪裏顯示？",
          "頻道列表：",
          <Image
            src="/images/2-11.jpg"
            height={500}
            width={332}
            alt={"RaidCall"}
          />,
          "個人名片：",
          <Image
            src="/images/2-12.jpg"
            height={500}
            width={276}
            alt={"RaidCall"}
          />,
          "好友列表：",
          <Image
            src="/images/2-13.jpg"
            height={500}
            width={293}
            alt={"RaidCall"}
          />,
          "私人密語視窗：",
          <Image
            src="/images/2-14.jpg"
            height={500}
            width={532}
            alt={"RaidCall"}
          />,
          "徽章墻",
          <Image
            src="/images/2-15.jpg"
            height={500}
            width={610}
            alt={"RaidCall"}
          />,
        ],
      },
    ],
    server: [
      {
        question: "如何創建RC群？",
        answer: [
          <span>
            ◎
            在您使用RC語音群前，請務必先閱讀RC語音群使用規範，避免在使用過程中造成不必要的困擾。
            相關的語音群規範，請點擊：
            <Link href="/serverpolicy">
              <span>語音群規範</span>
            </Link>
            。
          </span>,
          "◎  語音群的創建方法：打開RC視窗，點擊右上方的‘創建語音群’，出現創建視窗後按步驟即可創建。",
          <Image
            src="/images/3-1.png"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "會員頭像的顏色代表什麽（語音群內的類型和權限）？",
        answer: [
          "頭像顏色代表在語音群內的身份，不同顏色的頭像，所具備的權限不同。具體如下：",
          <h6>
            <Image
              src="/images/role/role1.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            <Image
              src="/images/role/role2.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            普通遊客
          </h6>,
          "無任何管理權限，如果語音群只允許會員進入，普通遊客無法進入語音群。",
          <h6>
            <Image
              src="/images/role/role3.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            <Image
              src="/images/role/role4.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            語音群會員
          </h6>,
          "可以參與會員群聊，但無任何管理權限，與普通遊客的區別在於如果語音群設定了‘頻道只允許會員進入’時，會員可以進入頻道但是遊客不允許。",
          <h6>
            <Image
              src="/images/role/role5.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            <Image
              src="/images/role/role6.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            房間管理員
          </h6>,
          "由語音群創建者或者語音群管理員、區管理員授予權限。具備踢出房間、禁止用戶語音、禁止用戶發送訊息、發送頻道廣播的權限，這些權限僅限於其權限範圍內的房間。",
          <h6>
            <Image
              src="/images/role/role7.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            <Image
              src="/images/role/role8.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            區管理員
          </h6>,
          "由語音群創建者或者語音群管理員授予權限。具備踢出頻道、禁止用戶語音、禁止用戶發送訊息、發布頻道廣播的權限，但這些權限僅限於其權限範圍內的頻道。",
          <h6>
            <Image
              src="/images/role/role9.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            <Image
              src="/images/role/role10.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            語音群管理員
          </h6>,
          "由語音群創建者授予權限。具備創建刪除子頻道、設置子頻道管理員、踢出語音群、踢出頻道、禁止用戶語音、禁止用戶發送信息、封鎖用戶帳號、封鎖用戶IP、發布RC群廣播、會員管理的權限。",
          <h6>
            <Image
              src="/images/role/role11.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            <Image
              src="/images/role/role12.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            語音群管理員
          </h6>,
          "即語音群所有者，擁有此語音群的最高權限，具備語音群管理員的所有權限。區別在於只有語音群創建者可以設置語音群管理員。而語音群管理員只能設定子頻道管理員而無法設定語音群管理員。 ",
          <h6>
            <Image
              src="/images/role/role13.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            <Image
              src="/images/role/role14.png"
              height={14}
              width={14}
              alt={"RaidCall"}
            />
            官方人員
          </h6>,
          "Raidcall官方人員，若遇到bug需要報告或者有好的建議，歡迎你聯系官方人員。如有關於RC的使用問題，也可聯系官方人員解決。 ",
        ],
      },
      {
        question: "語音頻道公聊和會員群聊有什麽區別？",
        answer: [
          "兩者的對象不同。",
          "語音頻道公聊：對象是該頻道內的所有用戶；",
          "會員群聊：對象是該語音群內的會員。",
        ],
      },
      {
        question: "怎樣搜尋RC群？",
        answer: [
          "點選RC視窗右上方的‘搜尋語音群’，在彈出框中可選擇不同的搜尋條件進行搜尋，分別為按名稱搜尋，按ID搜尋，按類別搜尋。",
          <Image
            src="/images/3-2.png"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "怎樣成為一個RC群會員？",
        answer: [
          "1) 在當前語音的視窗左上角點擊“群操作設定”按鈕，出現菜單再點擊“申請會員”；",
          <Image
            src="/images/3-4.png"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "可以刪除語音群嗎？",
        answer: [
          "語音群創建后是不可以被刪除的，但可以更改名稱。點擊您的群名稱，右鍵點選 ’檢視/編輯’，即可更改。",
        ],
      },
      {
        question: "語音群黑名單的管理功能有哪些？",
        answer: [
          "1) 帳號封鎖：該操作可將用戶踢出當前所在的語音群，在被封帳號解鎖前，用戶無法再進入該語音群，且不能申請會員；",
          "2) IP封鎖：該操作可將相關的用戶踢出當前所在的語音群，在被封IP解鎖前，此IP段位的所有用戶都無法進入該語音群且不能申請會員；",
          "3) 臨時被踢名單：該操作可將用戶暫時踢出當前所在的語音群，進行該操作時要求設定封鎖時長，時間到后系統會自動解鎖，被暫封的用戶可重新進入。",
        ],
      },
      {
        question: "如何使用黑名單管理？",
        answer: [
          "如果你具備相應的管理權限，可按以下兩種方法進行操作：",
          "1) 在當前的語音群選擇你要封鎖的用戶，按右鍵點選‘封鎖’，即可實現封鎖用戶帳號、踢除用戶及封鎖IP位址。",
          "2) 點擊語音群左上角的群圖標，選擇‘黑名單’，即可新增要封鎖的用戶。",
          "3) 在RC視窗‘我的語音群’中選擇相應的語音群，右鍵擊選‘檢視群資料’，然後在選項中選擇‘黑名單’，即可進行添加封鎖帳號和IP的操作。",
        ],
      },
      {
        question: "怎麼使用語音群公告及頻道公告？",
        answer: [
          "（1）、在所在的語音群點擊群名，選擇‘公告’，可編輯群公告；",
          "（2）、在所在的語音群點擊頻道名，按右鍵選擇“檢視/編輯”，可編輯頻道公告；",
          "（3）、在頻道公告中可以使用Markdown語法。",
        ],
      },
      {
        question: "語音群積分的計算方式與等级關係？",
        answer: [
          "語音群積分是根據群成員在該語音群所停留的在線時長來計算的，每個在線用戶每滿小時增加一分，不滿一小時的部分會累積到下一次的在線時長計算。 語音群的積分與等級關係如下圖所示：",
          <ServerLevelTable />,
        ],
      },
      {
        question: "怎樣才能創建更多的語音群？",
        answer: [
          "個人可創建的語音群數目由使用者的RC等級決定。具體的關係如下：",
          <Image
            src="/images/server-count.jpg"
            height={500}
            width={301}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "什麼是群組？",
        answer: [
          "為了讓使用者擁有一個更強互動功能的平臺，RC語音新增了群組互動平臺，群組的對象是該語音群內的會員。群創建者或者管理員成功邀請您成為會員，或者您的會員申請得到群創建者或者管理員的核准時，您的暱稱都會顯示在群組內的會員列表。在群組內，會員之間可以進行跨頻道文字聊天，相冊分享，檔案分享等。",
        ],
      },
      {
        question: "為什麼我的群（伺服器）設了密碼後會無效呢？",
        answer: [
          "RC語音已經取消了語音群密碼功能（伺服器），改為更豐富的群訪問進入限制設定。",
          "使用舊版本（5.2.8和5.3.0）去設定伺服器密碼後一樣無效。",
          "如果您不希望任何人都能訪問到自己的群或是某頻道，可以在群遊客限制選項中勾選該群只允許會員進入/語音子頻道只允許會員進入。",
          <Image
            src="/images/3-6.png"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "什麼是貢獻值？如何計算？",
        answer: [
          "貢獻值代表的是語音群的會員在該群所待的在線時長，在群里所待時間越長，貢獻值就越高。每在群里待一個小時，可獲得一點貢獻值，不足一小時的部分，會累積到下一次的在線時長計算。",
        ],
      },
      {
        question: "我只創建了一個群，但我的語音群下方怎麼顯示不止一個？",
        answer: [
          "我的語音群中顯示的群是指我已加入的群（已成為群會員）及我創建的群。",
        ],
      },
      // {
      //   question: "如何解鎖被封鎖的帳號或IP？",
      //   answer: [
      //     "在群資料的黑名單中右鍵點選一個被封鎖的帳號/IP，按刪除，即可解鎖被封鎖的帳號/IP。",
      //     <Image
      //       src='/images/3-7.jpg'
      //       width={540}
      //       alt={"RaidCall"}
      //     />,
      //   ],
      // },
      {
        question: "如何移除會員？",
        answer: [
          "a) 若您是語音群管理員或創建者，可在語音群的群組中選擇一個頻道管理員或會員，右鍵點選 ‘移除會員’即可。",
          <Image
            src="/images/3-8.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
          "b) 若您是語音群的會員，可在我的語音群中選擇你欲解除會員關係的語音群，右鍵點選‘解除會員關係’即可。",
          <Image
            src="/images/3-14.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "什麼是群名片？",
        answer: [
          "為給語音群管理員提供更好的管理平臺，RC語音增設了群名片功能。",
          "群名片代表的是會員在語音群中的名稱，同一個帳戶在不同的語音群可以擁有不同的群名片。使用了群名片的會員名稱在語音群中顯示為深藍色，並且在頻道列表中顯示為群名片的名稱。若沒有使用群名片，則顯示為自己的昵稱。",
          "語音群會員可自由更改自己的群名片，群管理員也具備更改會員群名片的權限，但管理員之間無法互改群名片。",
        ],
      },
      {
        question: "如何更改群名片？",
        answer: [
          "1）若您是群會員或群管理員，在語音群內的群組點擊自己的暱稱，右鍵點選「修改 群名片」進行更改。",
          <Image
            src="/images/3-9.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
          "2）在語音群內的群組點擊自己的暱稱，右鍵點選「修改群名片」進行更改。若您是 群管理員，可點擊會員/頻道管理員的暱稱更改他們的群名片。",
          <Image
            src="/images/3-10.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何設置區管理員？",
        answer: [
          "1) 先邀請或申請為會員。欲被設為區管理員的用戶需在母頻道下(與大廳平級的頻道)，點擊它的暱稱，右鍵點選設為[頻道管理員]。",
          "2) 設為區管後，該頻道以下的子頻道都將有相關的管理權限。此外，區管的頭像在母頻道下顯示為橘色，在子頻道下顯示為青橘色。",
          <Image
            src="/images/3-11.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何設定公告彈出？",
        answer: [
          "目前的公告彈出是由系統預設，各語音群不能獨立設定。以下兩種情況會自動彈出公告：",
          "1）用戶第一次進入一個語音群，系統會自動彈出該語音群的公告。",
          "2）語音群公告有更新時，用戶進入語音群時系統會自動彈出公告。",
        ],
      },
      {
        question: "什麼是語音群財富值？",
        answer: [
          "語音群的財富值是群的成長貨幣，單位為“金豆”；",
          "為了保障語音群信息的安全，只有會員有權限查看群的財富值；",
          "目前可以通過群組成員的在線時長獲得金豆，後期金豆可用來兌換會員勳章，申請群資源等（如高音質，投票系統等）；",
          "50個成員同時在線1小時=1金豆，未滿一小時的部份累計到下一次在線時長中計算。",
        ],
      },
    ],
    channel: [
      {
        question: "想豐富專屬個人語音群內容嗎？",
        answer: [
          "RC語音支援語音群創建者/管理員新建/刪除頻道功能，創建者/管理員可以根據語音群內部需要，隨意創建一級頻道/二級頻道，各一級頻道/二級頻道之間語音獨立，創建者/管理員也可以給頻道加密，禁止沒有相關許可權的用戶進入。",
        ],
      },
      {
        question: "怎麼創建一個頻道？",
        answer: [
          "創建語音群后，創建者和群管理員可隨意在群內新建一級頻道。按右鍵選擇創建，輸入頻道名稱后點擊確定；你也可以在語音群內的‘頻道管理’創建一級頻道。",
          <Image
            src="/images/4-1.jpg"
            height={500}
            width={304}
            alt={"RaidCall"}
          />,
          <Image
            src="/images/4-2.jpg"
            height={500}
            width={304}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "怎麼刪除一個頻道？",
        answer: [
          "如果你想刪除頻道，可直接選擇需刪除的頻道，按右鍵選擇‘刪除’，或者在語音群內的‘頻道管理’選項進行刪除頻道的操作。",
          <Image
            src="/images/4-4.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "怎麼設置頻道密碼？",
        answer: [
          "1) 如果你希望在創建好的一級頻道/二級頻道內設置一個密碼，可點擊頻道名，右鍵點選“檢視/編輯”，在基本資料中設置頻道密碼。",
          <Image
            src="/images/4-5.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何使用頻道排序？",
        answer: [
          "右鍵選擇頻道排序，在彈出窗口中使用‘上移’‘下移’功能進行頻道排序；也可以在左下角的‘頻道管理’通道進行排序操作。",
          <Image
            src="/images/4-6.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何使用頻道廣播？",
        answer: [
          "點擊當前頻道名稱,按右鍵選擇頻道廣播，在彈出視窗中編輯廣播內容，進行廣播。",
          <Image
            src="/images/4-7.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何設定信息提示？",
        answer: [
          "點擊頻道名稱，按右鍵點選'檢視/編輯'，在選項基本資料勾選'此頻道不許任何人進入（只用於信息顯示）。",
          <Image
            src="/images/4-9.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "怎麼允許/禁止一個會員說話？",
        answer: [
          "在當前頻道點選一個會員，按滑鼠右鍵，勾選‘禁止此人語音’，可允許/禁止該會員說話，頻道內所有成員都將聽不到被禁止語音的會員的說話。",
          <Image
            src="/images/4-10.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "什麼是接待頻道？",
        answer: [
          "接待頻道由語音群管理員設定，它可以是大廳以外的任意一個頻道，名稱在語音群內顯示為紅色。",
          "用戶進入設有接待頻道的語音群時，會自動進入到接待頻道，但通過好友中的頻道動態進入語音群時不受接待頻道影響。",
        ],
      },
      {
        question: "如何設定頻道的發言模式？",
        answer: [
          "管理員對需要修改發言模式的頻道進行“檢視/編輯”，在頻道基本資料選定發言模式，最後按“保存”。",
          <Image
            src="/images/4-13.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "什麼是連麥功能？",
        answer: [
          "連麥是在排麥模式下實現多人同時上麥說話的目的，滿足主持人與嘉賓互動、朋友合唱、互動聊天，多人會談等場景需要。連麥功能主要針對社群管理員使用，管理員可以向麥序成員發起邀請，同時，也可以向語音中的其他成員進行邀請，被邀請的人即可直接被連麥，連麥成功後即可與其他連麥成員進行多人說。如下圖：",
          <Image
            src="/images/4-15.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何邀請連麥？",
        answer: [
          "在排麥模式下，社群管理員，在麥序例表中，通過點擊受邀人的右鍵選單中的“邀請連麥”項，對受邀人發送連麥邀請。如下圖：",
          <Image
            src="/images/4-16.jpg"
            height={500}
            width={275}
            alt={"RaidCall"}
          />,
          <Image
            src="/images/4-17.jpg"
            height={500}
            width={271}
            alt={"RaidCall"}
          />,
          "點擊邀請連麥麥序中會出現連麥區，在連麥區中可以看到管理員所邀請的人，如果要管理操作連麥區中的人，可以通過滑鼠左鍵點擊大頭貼即會出現管理選項。",
          <Image
            src="/images/4-18.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何退出連麥？",
        answer: [
          <>
            <span>
              當移到連麥框中即會出現【
              <Image
                src="/images/4-19.jpg"
                height={500}
                width={13}
                alt={"RaidCall"}
              />
              】按鈕，左鍵點擊即可清空連麥成員。
            </span>
          </>,
          <Image
            src="/images/4-20.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
          <Image
            src="/images/4-21.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何管理連麥？",
        answer: [
          "社群管理員在連麥框中通過滑鼠左鍵點擊大頭貼，即可彈出管理選項，在選項中可以對連麥成員進行管理。",
          <Image
            src="/images/4-22.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
    ],
    voice: [
      {
        question: "怎樣測試我的語音設備？",
        answer: [
          "進入一個語音群，在群窗口的聊天區域處點擊‘語音設定’，然後在彈出界面點擊“語音檢測”，根據系統提示測試你的語音設備。",
        ],
      },
      {
        question: "什麼是混音模式？",
        answer: [
          "混音模式是將電腦發出的聲音與傳入麥克風的聲音混合，分享給頻道成員的一種模式。",
        ],
      },
      {
        question: "怎樣更改頻道音質模式？",
        answer: [
          "頻道音質模式分為兩種，聊天模式和娛樂模式。如需更改，請點擊所在頻道的名稱，按右鍵點選‘檢視/編輯’，在選項‘基本資料’裡更改頻道模式。自由發言和管理員發言都是聊天模式，排麥發言則是娛樂模式(高音質)",
          <Image
            src="/images/5-4.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "頻道發言模式有哪幾種？",
        answer: [
          "自由發言：頻道的所有會員都可以使用麥克風講話以及文字聊天，自由無限。",
          "管理員發言：語音群創建者或語音群管理員.頻道管理員可以指揮講話秩序。其他會員不可以使用麥克風講話,但可以進行文字聊天。",
          "排麥發言：所在的頻道會員需要排隊輪流講話或哈拉歡唱等。",
        ],
      },
      {
        question: "怎麼更改頻道發言模式？",
        answer: [
          "如果你具備相應的管理權限，可在當前頻道視窗的左下方更改頻道發言模式，或者檢視/編輯該頻道的基本資料，選擇頻道模式進行更改。",
          <Image
            src="/images/5-5.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "怎麼更改個人通話設置？",
        answer: [
          "您可以在當前頻道的聊天區域上方點擊“系統設定”，然后在彈出界面中的“語音設定”里進行設定。",
          "如果您選擇按鍵發話，說話時按住設定好的熱鍵，頻道內的成員就能聽到您的聲音。如果您覺得這種方式不方便，可以點擊切換為‘音量感應’，在您說話時我們的程式就會自動捕捉您的聲音。",
          <Image
            src="/images/5-6.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "聽不到別人講話/別人聽不到我講話？",
        answer: [
          "假如您聽不到別人講話，請按以下步驟檢查問題：",
          "1) 首先檢查自己的耳麥是否插好；",
          "2) 耳麥是否正常可以使用：",
          "可以使用RC系統中的語音檢測功能進行檢測。請點視窗左上方的RC語音-->系統設定-->音頻設定-->語音設備調節設定。",
          "3) 檢查選擇的設備是否正確：",
          "A) 如果您聽不到聲音，請檢查輸出裝置：點擊RC視窗左上角的 RC語音--系統設定--音頻設定，更改輸出裝置。",
          "B) 如果別人聽不到您的聲音，則需要更改輸入裝置。",
          <Image
            src="/images/5-9.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "為什麽錄音功能無法儲存檔案？",
        answer: [
          "有兩種方式可以修正：",
          "1) 直接在設定更改檔案儲存路徑到桌面；",
          "2) 使用管理員身份登入電腦系統。",
        ],
      },
      {
        question: "語音有雜訊怎麼辦？",
        answer: [
          "1) 檢查耳麥是否插好: 有些電腦的耳麥插頭比較容易鬆動，請使用者自行調整。",
          "2) 檢查使用別的聊天軟體是否也有雜訊: 有些音效卡和耳麥本身就會有很多雜訊，如果檢查到別的軟體也會有雜訊，就得請電腦工程師查看問題。",
          "3) 網路不穩定: 建議在使用RC語音的時候不要下載東西和開PPS，因為這會很佔網路。",
        ],
      },
      {
        question: "Win7作業系統下開啟RC時，其他系統音效聲音會被調降該怎麼辦？",
        answer: [
          "點擊RC視窗左上角的 「RC語音」-> 「系統設定」->「一般設定」，勾選 「禁止Windows自動調節音量」（僅針對windows7）。",
          "或選擇 「控制台」 -> 「聲音」 -> 「通訊」，在選項裡，選擇第四項 「不進行動作」。",
        ],
      },
      {
        question: "Win7作業系統下開啟RC時，其他系統音效聲音會被調降該怎麼辦？",
        answer: [
          "在頻道內用滑鼠點擊聊天視窗中的’錄音’，錄音即開始，如要結束錄音，只需再點一下‘錄音’，錄音結束的同時程式會自動開啟存放錄音檔案的資料夾。",
          <Image
            src="/images/5-7.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "如何更改錄音文件的存放路徑？",
        answer: [
          "點擊RC視窗左上角的‘系統設定’，然後在‘更改錄音存放路徑’中進行更改。",
          <Image
            src="/images/5-8.jpg"
            height={500}
            width={540}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "為什麼我講話時會產生迴音呢？",
        answer: [
          "迴音一般都是和您聊天的朋友那邊的問題，產生的原因有以下幾個：",
          "1) 對方使用了喇叭，喇叭會使您聽到迴音．所以使用ＲＣ盡量使用耳麥。",
          "2) 對方選了系統內放，系統內放也會使您聽到回音。",
          "3) 對方的耳麥或音效卡質量不好，現在市面上有些品質比較差的耳麥的線路會產生干擾， 這樣也會產生回音。",
        ],
      },
      {
        question: "什麼是回音消除？",
        answer: [
          "回音消除是通過信號處理技術，消除掉使用喇叭或耳麥乾擾等因素所產生的回音，只在自由模式、指揮模式有效。",
          "回音消除功能可能會對K歌用戶造成影響。若給您的使用帶來不便，可在「系統設定」->「語音通話設定」取消「回音消除」功能。",
        ],
      },
      {
        question: "如何手動調節音量感應條？",
        answer: [
          "拖動感應條指針，指針往左拖動靈敏度越高，聲音的識別度越高，對方聽到您的聲音會更連貫，但也會造成不必要的噪音傳輸。",
        ],
      },
      {
        question: "如何將量感應條調到合適的位置?",
        answer: [
          "只需保證在您沒說話或者沒有做出特殊響動的時候，音量跳動值剛好保持在指針的左邊顯示為紅；而在你說話的時候，音量跳動值能保持超過指針出現綠色部份即可。",
        ],
      },
    ],
    vip: [
      {
        question: "什麼是RC語音VIP會員",
        answer: [
          "RC語音VIP會員是RC語音平臺提供給用戶們的增值服務，在享受RC語音平臺一般免錢的服務下，通過付費獲得更好的付費體驗，並享有除了免費特權之外的更多增值特權。",
        ],
      },
      {
        question: "VIP開通方式",
        answer: [
          <span>
            登入RC官方
            <Link href="/pay">
              <span>儲值中心</span>
            </Link>
            ，點開通VIP進入開通頁面，選擇開通時長進行開通。標準價格每月（30天）需要200RC幣。
          </span>,
        ],
      },
      {
        question: "VIP開通優惠",
        answer: [
          "首次開通月度VIP享受體驗價5折（100RC幣）優惠。",
          "首次開通年度VIP贈送年度VIP專屬徽章，以及獎勵1000V點，快速升級。",
        ],
      },
      {
        question: "VIP成長與等級",
        answer: [
          <Image
            src="/images/8-1.png"
            height={500}
            width={513}
            alt={"RaidCall"}
          />,
        ],
      },
      {
        question: "VIP特權",
        answer: [
          <Image
            src="/images/8-2.png"
            height={500}
            width={505}
            alt={"RaidCall"}
          />,
        ],
      },
    ],
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedKey, setSelectedKey] = useState<keyof typeof faqs>("hot");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#")) {
      const [key, indexStr] = hash.slice(1).split("-");
      const index = parseInt(indexStr, 10) - 1;
      if (faqs.hasOwnProperty(key) && !isNaN(index)) {
        setSelectedKey(key as keyof typeof faqs);
        setOpenIndex(index);
        setTimeout(() => {
          const target = document.getElementById(`faq-${index + 1}`);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, []);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
    window.location.hash = `${selectedKey}-${idx + 1}`;
  };

  return (
    <>
      {/* 手機版浮動按鈕 */}
      <div
        className={main["faq-toggle-btn"]}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </div>

      {/* 手機版展開選單 */}
      <div
        className={`${main["faq-mobile-menu"]} ${menuOpen ? main["open"] : ""}`}
      >
        <ul>
          {menu.map((item) => (
            <li key={item.key}>
              <a
                onClick={() => {
                  setSelectedKey(item.key as keyof typeof faqs);
                  setOpenIndex(null);
                  setMenuOpen(false);
                }}
                className={selectedKey === item.key ? main["current"] : ""}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ 主內容 */}
      <div className={`${content["main"]} ${main["main"]}`}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <h1>常見問題</h1>
          <div className={`${main["help-outer"]} ${common["radius4"]}`}>
            <div className={`${main["help-inner"]} ${common["clearFloat"]}`}>
              <ul className={`${main["content"]} ${main["help-menu"]}`}>
                {menu.map((item) => (
                  <li key={item.key}>
                    <a
                      onClick={() => {
                        setSelectedKey(item.key as keyof typeof faqs);
                        setOpenIndex(null);
                      }}
                      className={
                        selectedKey === item.key ? main["current"] : undefined
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className={main["help-content"]}>
                {faqs[selectedKey].map((faq, idx) => (
                  <div
                    key={idx}
                    id={`faq-${idx + 1}`}
                    className={`${main["help-node"]} ${openIndex !== idx ? main["closed"] : ""
                      }`}
                  >
                    <h5
                      onClick={() => toggleItem(idx)}
                      style={{ cursor: "pointer" }}
                    >
                      <span>{`${idx + 1}. ${faq.question}`}</span>
                    </h5>
                    <div>
                      <span className="bg"></span>
                      {faq.answer.map((line, i) =>
                        typeof line === "string"
                          ? parseLine(line, i)
                          : React.cloneElement(line as JSX.Element, { key: i })
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
