"use client";
import React, { useState, useEffect } from "react";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/profile.module.css";
import level from "@/styles/common/level.module.css";
import vip from "@/styles/common/vip.module.css";

// Components
import {
  vipIcon,
  payIcon,
  socialIcon,
  arrowDownIcon
} from "@/components/icons/ProfileIcons";

interface ProfileClientPartProps {
  userData: any;
}

export default function UserProfilePage({ userData }: ProfileClientPartProps) {
  // State
  const [isVipMenuOpen, setIsVipMenuOpen] = useState(false);
  const [isPayMenuOpen, setIsPayMenuOpen] = useState(false);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData?.name || "",
    gender: userData?.gender || null,
    birthMonth: userData?.birthMonth || "",
    birthDay: userData?.birthDay || "",
    birthYear: userData?.birthYear || "",
    country: userData?.country || "",
    signature: userData?.signature || "",
  });

  // Effect
  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData.name || "",
        gender: userData.gender || null,
        birthMonth: userData.birthMonth || "",
        birthDay: userData.birthDay || "",
        birthYear: userData.birthYear || "",
        country: userData.country || "",
        signature: userData.signature || "",
      });
    }
  }, [userData]);

  // Handle
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prevData => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  return (
    <>
      <div className={`${content["main"]} ${main["main"]}`}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <h1>個人中心</h1>
          <div
            className={`${content["wrapper"]} ${main["wrapper"]} ${main["clearFloat"]}`}
          >
            <div className={main["Maincontent"]}>
              <div className={main["sidebars"]}>
                {/* 使用者資訊 */}
                <div className={main["userInfoWrapper"]}>
                  <div className={main["userAvatarNameBox"]}>
                    <div className={main["userAvatarBox"]}>
                      <div className={`${main["userAvatarBorder"]}`}></div>
                      <img
                        className={`${main["img"]} ${main["userAvatar"]}`}
                        src={userData?.avatarUrl || "/images/user/IMLogo.png"}
                        alt="User Avatar"
                      />
                    </div>
                    <div className={main["userInfoBox"]}>
                      <p className={main["userNickName"]}>
                        {userData?.name || "載入中..."}
                      </p>
                      <div className={`${main["levelBox"]}`}>
                        <div
                          className={`${main["levelIcon"]} ${level[`lv-${Math.min(Math.max(1, userData?.level || 1), 55)}`]}`}
                        ></div>
                        <p>LV.{userData?.level || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "12px",
                      color: "#666",
                      textAlign: "start",
                    }}
                  >
                    <div
                      className="vip"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span className={main["Label"]}>VIP類型：</span>
                      <div
                        className={`${main["vipIcon"]} ${vip[`vip-${userData?.vip || 1}-big-inactive`]} ${!userData?.vip ? main["vipIconInactive"] : ""}`}
                      ></div>
                    </div>
                    <div
                      className="growthWrapper"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="growth"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span className={main["Label"]}>成長值：</span>
                        <span>{userData?.xp || 0} / {userData?.requiredXp || 0}</span>
                      </div>
                      <div
                        className="dailyGrowth"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span className={main["Label"]}>每天成長：</span>
                        <span>0</span>
                      </div>
                    </div>
                    <div className={main["vipExpiration"]}>
                      <span className={main["Label"]}>到期時間：</span>
                      <span className={main["vipExpirationText"]}>
                        {userData?.vip > 0 ? "已開通VIP" : "您尚未開通VIP。"}
                      </span>
                    </div>
                  </div>
                  <div className={main["openVIPBtnBox"]}>
                    <div className={main["btn"]}>
                      <span className={main["openVIPBtn"]}>立即開通VIP</span>
                    </div>
                  </div>
                </div>

                {/* 左側菜單 */}
                <div className={main["menuTree"]}>
                  {/**Vip**/}
                  <div className={main["menuItem"]}>
                    <div
                      className={main["titleTextBox"]}
                      onClick={() => setIsVipMenuOpen(!isVipMenuOpen)}
                    >
                      <div className={main["titleText"]}>
                        {vipIcon()}
                        {"VIP會員中心"}
                      </div>
                      {arrowDownIcon(isVipMenuOpen ? `${main["arrowUp"]}` : "")}
                    </div>
                    {isVipMenuOpen && (
                      <ul>
                        <li className={main["li"]}>
                          <a
                            href="#"
                            className={`${main["link"]} ${main["current"]}`}
                          >
                            VIP會員首頁
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>

                  {/**Pay**/}
                  <div className={main["menuItem"]}>
                    <div
                      className={main["titleTextBox"]}
                      onClick={() => setIsPayMenuOpen(!isPayMenuOpen)}
                    >
                      <div className={main["titleText"]}>
                        {payIcon()}
                        {"儲值中心"}
                      </div>
                      {arrowDownIcon(isPayMenuOpen ? `${main["arrowUp"]}` : "")}
                    </div>
                    {isPayMenuOpen && (
                      <ul>
                        <li className={main["li"]}>
                          <a
                            href="#"
                            className={`${main["link"]} ${main["current"]}`}
                          >
                            儲值中心
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>

                  {/**Social**/}
                  <div className={main["menuItem"]}>
                    <div
                      className={main["titleTextBox"]}
                      onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
                    >
                      <div className={main["titleText"]}>
                        {socialIcon()}
                        {"社群中心"}
                      </div>
                      {arrowDownIcon(
                        isSocialMenuOpen ? `${main["arrowUp"]}` : ""
                      )}
                    </div>
                    {isSocialMenuOpen && (
                      <ul>
                        <li className={main["li"]}>
                          <a
                            href="#"
                            className={`${main["link"]} ${main["current"]}`}
                          >
                            管理語音群
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* 右側內容 */}
              <div className={main["content"]}>
                <div className={main["cTitle"]}>
                  <strong>個人檔案</strong>
                </div>
                <ul className={main["form"]}>
                  <li>
                    {/* <label>帳號：</label>
                    <input
                      type="text"
                      className={main["txtInput"]}
                      value={userData?.userId || ""}
                      style={{ width: "200px" }}
                      readOnly
                    /> */}
                    <div className={main["levelBox"]}>
                      <label>等級：</label>
                      <span>{userData?.level || 0}</span>
                    </div>
                  </li>
                  <li>
                    <label>暱稱：</label>
                    <input
                      type="text"
                      className={main["txtInput"]}
                      value={profileData.name}
                      onChange={handleInputChange}
                      style={{ width: "300px" }}
                    />
                  </li>
                  <li>
                    <label>性別：</label>
                    <input type="radio" name="gender" value="Male" checked={profileData.gender === 'Male'} onChange={handleGenderChange} /> 男
                    <input type="radio" name="gender" value="Female" checked={profileData.gender === 'Female'} onChange={handleGenderChange} /> 女
                  </li>
                  <li>
                    <label>生日：</label>
                    <select className={main["select"]} name="birthMonth" value={profileData.birthMonth} onChange={handleInputChange}>
                      <option value="">月份</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}月</option>
                      ))}
                    </select>
                    <select className={main["select"]} name="birthDay" value={profileData.birthDay} onChange={handleInputChange}>
                      <option value="">日期</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}日</option>
                      ))}
                    </select>
                    <select className={main["select"]} name="birthYear" value={profileData.birthYear} onChange={handleInputChange}>
                      <option value="">年份</option>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}年</option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <label>地區：</label>
                    <select className={main["select"]} name="country" value={profileData.country} onChange={handleInputChange}>
                      <option value="">請選擇地區</option>
                      <option value="taiwan">台灣</option>
                      <option value="china">中國</option>
                      <option value="japan">日本</option>
                      <option value="korea">韓國</option>
                      <option value="usa">美國</option>
                      <option value="uk">英國</option>
                      <option value="france">法國</option>
                      <option value="germany">德國</option>
                      <option value="italy">義大利</option>
                      <option value="spain">西班牙</option>
                      <option value="portugal">葡萄牙</option>
                      <option value="brazil">巴西</option>
                      <option value="argentina">阿根廷</option>
                      <option value="mexico">墨西哥</option>
                      <option value="colombia">哥倫比亞</option>
                      <option value="chile">智利</option>
                      <option value="peru">秘魯</option>
                      <option value="venezuela">委內瑞拉</option>
                      <option value="bolivia">玻利維亞</option>
                      <option value="ecuador">厄瓜多爾</option>
                      <option value="paraguay">巴拉圭</option>
                      <option value="uruguay">烏拉圭</option>
                      <option value="nigeria">奈及利亞</option>
                      <option value="southAfrica">南非</option>
                      <option value="india">印度</option>
                      <option value="indonesia">印尼</option>
                      <option value="malaysia">馬來西亞</option>
                      <option value="philippines">菲律賓</option>
                      <option value="thailand">泰國</option>
                      <option value="vietnam">越南</option>
                      <option value="turkey">土耳其</option>
                      <option value="saudiArabia">沙烏地阿拉伯</option>
                      <option value="qatar">卡達</option>
                      <option value="kuwait">科威特</option>
                      <option value="oman">阿曼</option>
                      <option value="bahrain">巴林</option>
                      <option value="algeria">阿爾及利亞</option>
                      <option value="morocco">摩洛哥</option>
                      <option value="tunisia">突尼西亞</option>
                      <option value="nigeria">奈及利亞</option>
                    </select>
                  </li>
                  <li>
                    <label>簽名：</label>
                    <textarea
                      className={main["txtInput"]}
                      style={{ width: "100%", height: "80px" }}
                      value={profileData.signature}
                      onChange={handleInputChange}
                    ></textarea>
                  </li>
                  <li className={main["btnLi"]}>
                    <div className={main["btn"]}>
                      <span style={{ width: "135px" }}>提交</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
