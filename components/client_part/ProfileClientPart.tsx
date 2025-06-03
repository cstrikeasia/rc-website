"use client";
import React, { useState } from "react";

import content from "@/styles/common/content.module.css";
import main from "@/styles/profile.module.css";
import level from "@/styles/common/level.module.css";
import vip from "@/styles/common/vip.module.css";

export default function UserProfilePage() {
  const [isVipMenuOpen, setIsVipMenuOpen] = useState(false);
  const [isPayMenuOpen, setIsPayMenuOpen] = useState(false);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);

  const vipIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="#6c6e6f"
    >
      <defs>
        <filter
          id="vipAlpha"
          filterUnits="objectBoundingBox"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feColorMatrix
            type="matrix"
            in="SourceGraphic"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
        </filter>
        <mask id="vipMask0">
          <g filter="url(#vipAlpha)">
            <rect x="0" y="0" width="18" height="18" />
          </g>
        </mask>
        <clipPath id="vipClip1">
          <rect x="0" y="0" width="18" height="18" />
        </clipPath>
        <g id="vipSurface5" clipPath="url(#vipClip1)">
          <path
            d="M 3.882812 -0.015625 C 6.285156 -0.015625 8.6875 -0.015625 11.089844 -0.015625 C 12.921875 0.269531 14.160156 1.285156 14.796875 3.03125 C 14.875 3.316406 14.9375 3.597656 14.984375 3.882812 C 14.984375 6.285156 14.984375 8.6875 14.984375 11.089844 C 14.753906 12.695312 13.914062 13.859375 12.464844 14.589844 C 12.019531 14.785156 11.5625 14.917969 11.089844 14.984375 C 8.6875 14.984375 6.285156 14.984375 3.882812 14.984375 C 2.277344 14.753906 1.109375 13.914062 0.382812 12.464844 C 0.183594 12.019531 0.0546875 11.5625 -0.015625 11.089844 C -0.015625 8.6875 -0.015625 6.285156 -0.015625 3.882812 C 0.269531 2.046875 1.285156 0.8125 3.03125 0.175781 C 3.316406 0.09375 3.597656 0.03125 3.882812 -0.015625 Z M 4.351562 0.570312 C 6.441406 0.566406 8.53125 0.570312 10.621094 0.585938 C 12.242188 0.675781 13.398438 1.453125 14.09375 2.914062 C 14.28125 3.386719 14.378906 3.875 14.382812 4.378906 C 14.414062 6.597656 14.402344 8.8125 14.355469 11.03125 C 14.105469 12.605469 13.234375 13.664062 11.734375 14.210938 C 11.371094 14.316406 11 14.375 10.621094 14.382812 C 8.382812 14.414062 6.148438 14.402344 3.910156 14.355469 C 2.347656 14.097656 1.296875 13.226562 0.761719 11.734375 C 0.648438 11.359375 0.589844 10.980469 0.585938 10.589844 C 0.566406 8.519531 0.566406 6.449219 0.585938 4.378906 C 0.679688 2.636719 1.535156 1.441406 3.148438 0.789062 C 3.542969 0.667969 3.945312 0.59375 4.351562 0.570312 Z"
            fillRule="evenodd"
            fillOpacity="1"
          />
        </g>
        <mask id="vipMask1">
          <g filter="url(#vipAlpha)">
            <rect x="0" y="0" width="18" height="18" fillOpacity="0.980392" />
          </g>
        </mask>
        <clipPath id="vipClip2">
          <rect x="0" y="0" width="18" height="18" />
        </clipPath>
        <g id="vipSurface8" clipPath="url(#vipClip2)">
          <path
            d="M 10.09375 3.324219 C 10.425781 3.292969 10.738281 3.355469 11.03125 3.515625 C 11.195312 3.640625 11.285156 3.808594 11.292969 4.015625 C 11.117188 5.175781 10.75 6.273438 10.195312 7.308594 C 9.332031 8.917969 8.242188 10.355469 6.929688 11.632812 C 6.5625 11.660156 6.210938 11.601562 5.875 11.453125 C 5.800781 11.414062 5.738281 11.359375 5.683594 11.292969 C 5.699219 9.804688 5.570312 8.332031 5.304688 6.871094 C 5.214844 6.359375 5.039062 5.878906 4.773438 5.433594 C 4.632812 5.234375 4.441406 5.160156 4.203125 5.214844 C 4.054688 5.269531 3.917969 5.347656 3.792969 5.449219 C 3.757812 5.46875 3.722656 5.464844 3.691406 5.433594 C 3.832031 4.757812 4.160156 4.1875 4.671875 3.71875 C 5.152344 3.34375 5.671875 3.285156 6.226562 3.546875 C 6.519531 3.785156 6.738281 4.082031 6.882812 4.4375 C 7.089844 5.007812 7.21875 5.59375 7.265625 6.195312 C 7.34375 7.304688 7.316406 8.410156 7.179688 9.507812 C 8.269531 8.035156 8.871094 6.378906 8.980469 4.539062 C 8.984375 4.351562 8.964844 4.167969 8.921875 3.984375 C 9.230469 3.621094 9.621094 3.398438 10.09375 3.324219 Z"
            fillRule="evenodd"
            fillOpacity="1"
          />
        </g>
      </defs>
      <g>
        <use href="#vipSurface5" mask="url(#vipMask0)" />
        <use href="#vipSurface8" mask="url(#vipMask1)" />
      </g>
    </svg>
  );

  const payIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="#6c6e6f"
    >
      <defs>
        <filter
          id="payAlpha"
          filterUnits="objectBoundingBox"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feColorMatrix
            type="matrix"
            in="SourceGraphic"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
        </filter>
        <mask id="pay1">
          <g filter="url(#payAlpha)">
            <rect x="0" y="0" width="18" height="18" fillOpacity="0.968627" />
          </g>
        </mask>
        <clipPath id="payClip1">
          <rect x="0" y="0" width="18" height="18" />
        </clipPath>
        <g id="paySurface5" clipPath="url(#payClip1)">
          <path
            d="M 17.984375 3.992188 C 17.984375 7.320312 17.984375 10.644531 17.984375 13.976562 C 17.628906 15.539062 16.65625 16.449219 15.0625 16.699219 C 11.011719 16.722656 6.953125 16.722656 2.898438 16.699219 C 1.308594 16.449219 0.335938 15.539062 -0.015625 13.976562 C -0.015625 10.644531 -0.015625 7.320312 -0.015625 3.992188 C 0.335938 2.425781 1.308594 1.515625 2.898438 1.265625 C 6.953125 1.242188 11.011719 1.242188 15.0625 1.265625 C 16.65625 1.515625 17.628906 2.425781 17.984375 3.992188 Z M 2.867188 2.585938 C 6.945312 2.578125 11.023438 2.585938 15.101562 2.601562 C 15.996094 2.808594 16.519531 3.363281 16.664062 4.273438 C 16.679688 4.761719 16.6875 5.253906 16.679688 5.75 C 11.546875 5.75 6.414062 5.75 1.28125 5.75 C 1.277344 5.253906 1.285156 4.761719 1.300781 4.273438 C 1.453125 3.363281 1.976562 2.800781 2.867188 2.585938 Z M 1.28125 7.085938 C 6.414062 7.085938 11.546875 7.085938 16.679688 7.085938 C 16.6875 9.289062 16.679688 11.492188 16.664062 13.695312 C 16.519531 14.601562 15.996094 15.15625 15.101562 15.363281 C 11.023438 15.386719 6.945312 15.386719 2.867188 15.363281 C 1.96875 15.15625 1.445312 14.601562 1.300781 13.695312 C 1.28125 11.492188 1.277344 9.289062 1.28125 7.085938 Z"
            fillRule="evenodd"
            fillOpacity="1"
          />
        </g>
        <mask id="payMask1">
          <g filter="url(#payAlpha)">
            <rect x="0" y="0" width="18" height="18" fillOpacity="0.972549" />
          </g>
        </mask>
        <clipPath id="payClip2">
          <rect x="0" y="0" width="18" height="18" />
        </clipPath>
        <g id="paySuface8" clipPath="url(#payClip2)">
          <path
            d="M 3.671875 12.179688 C 4.425781 12.175781 5.175781 12.179688 5.921875 12.199219 C 6.335938 12.34375 6.492188 12.628906 6.398438 13.0625 C 6.335938 13.265625 6.199219 13.402344 5.992188 13.464844 C 5.195312 13.488281 4.402344 13.488281 3.601562 13.464844 C 3.164062 13.21875 3.0625 12.875 3.304688 12.429688 C 3.410156 12.3125 3.53125 12.230469 3.671875 12.179688 Z"
            fillRule="evenodd"
            fillOpacity="1"
          />
        </g>
      </defs>
      <g>
        <use href="#paySurface5" mask="url(#mask0)" />
        <use href="#paySuface8" mask="url(#payMask1)" />
      </g>
    </svg>
  );

  const socialIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 18 18"
      version="1.1"
      fill="#6c6e6f"
    >
      <defs>
        <filter
          id="socialAlpha"
          filterUnits="objectBoundingBox"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feColorMatrix
            type="matrix"
            in="SourceGraphic"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
        </filter>

        <mask id="socialMask0">
          <g filter="url(#socialAlpha)">
            <rect
              x="0"
              y="0"
              width="18"
              height="18"
              style={{
                fillOpacity: 0.972549,
                stroke: "none",
              }}
            />
          </g>
        </mask>

        <clipPath id="socialClip1">
          <rect x="0" y="0" width="18" height="18" />
        </clipPath>

        <g id="socialSurface5" clipPath="url(#socialClip1)">
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fillOpacity: 1,
            }}
            d="M 6.453125 1.460938 C 8.371094 1.433594 9.664062 2.3125 10.335938 4.09375 C 10.75 5.667969 10.367188 7.011719 9.195312 8.121094 C 7.996094 9.035156 6.683594 9.234375 5.257812 8.71875 C 3.9375 8.125 3.179688 7.113281 2.988281 5.679688 C 2.867188 4.042969 3.492188 2.792969 4.867188 1.933594 C 5.371094 1.671875 5.898438 1.511719 6.453125 1.460938 Z M 6.414062 3.007812 C 7.75 2.941406 8.585938 3.550781 8.929688 4.835938 C 9.0625 6.035156 8.574219 6.875 7.46875 7.347656 C 6.425781 7.636719 5.5625 7.363281 4.886719 6.523438 C 4.476562 5.828125 4.40625 5.101562 4.675781 4.34375 C 5.023438 3.585938 5.601562 3.140625 6.414062 3.007812 Z"
          />
        </g>

        <mask id="socialMask1">
          <g filter="url(#socialAlpha)">
            <rect
              x="0"
              y="0"
              width="18"
              height="18"
              style={{
                fillOpacity: 0.968627,
                stroke: "none",
              }}
            />
          </g>
        </mask>

        <clipPath id="socialClip2">
          <rect x="0" y="0" width="18" height="18" />
        </clipPath>

        <g id="socialSurface8" clipPath="url(#socialClip2)">
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fillOpacity: 1,
            }}
            d="M 11.828125 1.5625 C 13.171875 1.820312 14.125 2.570312 14.695312 3.8125 C 15.28125 5.546875 14.898438 7.03125 13.554688 8.261719 C 13.101562 8.617188 12.59375 8.835938 12.023438 8.914062 C 11.371094 8.851562 11.113281 8.5 11.25 7.859375 C 11.300781 7.707031 11.386719 7.582031 11.515625 7.488281 C 12.375 7.28125 12.980469 6.773438 13.324219 5.960938 C 13.628906 4.765625 13.261719 3.84375 12.21875 3.199219 C 11.980469 3.074219 11.734375 2.980469 11.476562 2.917969 C 11.105469 2.519531 11.105469 2.121094 11.476562 1.722656 C 11.59375 1.660156 11.710938 1.605469 11.828125 1.5625 Z"
          />
        </g>

        <mask id="socialMask2">
          <g filter="url(#socialAlpha)">
            <rect
              x="0"
              y="0"
              width="18"
              height="18"
              style={{
                fillOpacity: 0.972549,
                stroke: "none",
              }}
            />
          </g>
        </mask>

        <clipPath id="socialClip3">
          <rect x="0" y="0" width="18" height="18" />
        </clipPath>

        <g id="socialSurface11" clipPath="url(#socialClip3)">
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fillOpacity: 1,
            }}
            d="M -0.015625 15.976562 C -0.015625 15.214844 -0.015625 14.457031 -0.015625 13.695312 C 0.363281 11.804688 1.511719 10.734375 3.429688 10.476562 C 5.632812 10.453125 7.832031 10.453125 10.039062 10.476562 C 11.953125 10.726562 13.09375 11.800781 13.464844 13.695312 C 13.488281 14.457031 13.488281 15.214844 13.464844 15.976562 C 13.382812 16.273438 13.1875 16.441406 12.882812 16.488281 C 12.429688 16.550781 12.132812 16.371094 11.988281 15.945312 C 11.976562 15.300781 11.964844 14.652344 11.953125 14.007812 C 11.796875 12.902344 11.167969 12.242188 10.070312 12.023438 C 7.847656 12 5.617188 12 3.390625 12.023438 C 2.296875 12.242188 1.667969 12.902344 1.511719 14.007812 C 1.5 14.652344 1.488281 15.300781 1.476562 15.945312 C 1.332031 16.371094 1.035156 16.550781 0.578125 16.488281 C 0.277344 16.4375 0.078125 16.265625 -0.015625 15.976562 Z"
          />
        </g>

        <mask id="socialMask3">
          <g filter="url(#socialAlpha)">
            <rect
              x="0"
              y="0"
              width="18"
              height="18"
              style={{
                fillOpacity: 0.972549,
                stroke: "none",
              }}
            />
          </g>
        </mask>

        <clipPath id="socialClip4">
          <rect x="0" y="0" width="18" height="18" />
        </clipPath>

        <g id="socialSurface14" clipPath="url(#socialClip4)">
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fillOpacity: 1,
            }}
            d="M 17.984375 13.445312 C 17.984375 14.328125 17.984375 15.203125 17.984375 16.085938 C 17.589844 16.570312 17.136719 16.628906 16.628906 16.257812 C 16.5625 16.164062 16.515625 16.058594 16.488281 15.945312 C 16.476562 15.300781 16.464844 14.652344 16.453125 14.007812 C 16.34375 13.191406 15.929688 12.585938 15.203125 12.199219 C 14.976562 12.132812 14.753906 12.050781 14.539062 11.953125 C 14.226562 11.648438 14.175781 11.304688 14.378906 10.914062 C 14.671875 10.554688 15.03125 10.476562 15.453125 10.6875 C 16.757812 11.1875 17.601562 12.105469 17.984375 13.445312 Z"
          />
        </g>
      </defs>

      <g id="socialMask1">
        <use href="#socialSurface5" mask="url(#socialMask0)" />
        <use href="#socialSurface8" mask="url(#socialMask1)" />
        <use href="#socialSurface11" mask="url(#socialMask2)" />
        <use href="#socialSurface14" mask="url(#socialMask3)" />
      </g>
    </svg>
  );

  const arrowDownIcon = (className: string) => (
    <svg
      enableBackground="new 0 0 32 32"
      height="15px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 32 32"
      width="15px"
      fill="#6c6e6f"
      className={className}
    >
      <path d="M14.77,23.795L5.185,14.21c-0.879-0.879-0.879-2.317,0-3.195l0.8-0.801c0.877-0.878,2.316-0.878,3.194,0  l7.315,7.315l7.316-7.315c0.878-0.878,2.317-0.878,3.194,0l0.8,0.801c0.879,0.878,0.879,2.316,0,3.195l-9.587,9.585  c-0.471,0.472-1.104,0.682-1.723,0.647C15.875,24.477,15.243,24.267,14.77,23.795z"></path>
    </svg>
  );

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
                        src="/images/user/IMLogo.png"
                        alt="User Avatar"
                      />
                    </div>
                    <div className={main["userInfoBox"]}>
                      <p className={main["userNickName"]}>
                        使用者名稱使用者名稱使用者名稱使用者名稱使用者名稱
                      </p>
                      <div className={`${main["levelBox"]}`}>
                        <div
                          className={`${main["levelIcon"]} ${level["lv-55"]}`}
                        ></div>
                        <p>LV.9</p>
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
                        className={`${main["vipIcon"]} ${vip["vip-1-big-inactive"]} ${main["vipIconInactive"]}`}
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
                        <span>0</span>
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
                        您尚未開通VIP。
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
                    <label>帳號：</label>
                    <input
                      type="text"
                      className={main["txtInput"]}
                      defaultValue="account"
                      style={{ width: "200px" }}
                    />
                    <div className={main["levelBox"]}>
                      <label>等級：</label>
                      <span>9</span>
                    </div>
                  </li>
                  <li>
                    <label>暱稱：</label>
                    <input
                      type="text"
                      className={main["txtInput"]}
                      defaultValue="使用者名稱使用者名稱使用者名稱使用者名稱使用者名稱"
                      style={{ width: "300px" }}
                    />
                  </li>
                  <li>
                    <label>性別：</label>
                    <input type="radio" name="gender" defaultChecked /> 男　
                    <input type="radio" name="gender" /> 女
                  </li>
                  <li>
                    <label>生日：</label>
                    <select className={main["select"]}>
                      <option>December</option>
                    </select>
                    <select className={main["select"]}>
                      <option>2</option>
                    </select>
                    <select className={main["select"]}>
                      <option>2016</option>
                    </select>
                  </li>
                  <li>
                    <label>地區：</label>
                    <select className={main["select"]}>
                      <option>SGSSI</option>
                    </select>
                  </li>
                  <li>
                    <label>簽名：</label>
                    <textarea
                      className={main["txtInput"]}
                      style={{ width: "100%", height: "80px" }}
                      defaultValue="123"
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
