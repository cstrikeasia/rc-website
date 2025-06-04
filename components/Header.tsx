"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// CSS
import header from "@/styles/common/header.module.css";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { token, handleLogout } = useAuth();
  const navLinks = [
    { label: "首頁", href: "/" },
    {
      label: "公告",
      href: "/announcement",
    },
    {
      label: "問題回報",
      href: "https://github.com/NerdyHomeReOpen/RiceCall/issues",
      target: "_blank",
    },
    {
      label: "伺服器狀態",
      href: "https://status.ricecall.com.tw/",
      target: "_blank",
    },
    {
      label: "Discord",
      href: "https://discord.gg/adCWzv6wwS",
      target: "_blank",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61575681189756",
      target: "_blank",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ricecall.com.tw/",
      target: "_blank",
    },
    {
      label: "Github",
      href: "https://github.com/NerdyHomeReOpen/RiceCall/tree/main",
      target: "_blank",
    },
  ];
  return (
    <div className={header["header"]}>
      <div className={header["wrapper"]}>
        <div className={header["logo"]}>
          <a href="/">
            <img src="/images/logo.png" alt="logo" />
          </a>
        </div>
        <div className={header["hamburger"]} onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </div>
        <div
          className={`${header["mobileMenu"]} ${open ? header["open"] : ""}`}
        >
          <div className={header["navBar"]}>
            {navLinks.map(({ label, href, target }) => (
              <a
                key={label}
                className={header["navBtn"]}
                href={href}
                target={target}
                rel={target === "_blank" ? "noreferrer" : undefined}
              >
                {label}
              </a>
            ))}
          </div>
          <div className={header["buttons"]}>
            {/* <div className={header["pay"]}>
              <a href="/rcpay" target="_blank" rel="noreferrer">儲值</a>
            </div> */}
            <div className={header["loginGroup"]}>
              {token ? (
                <div className={header["loginInfo"]}>
                  <span></span>
                  <div>
                    <a href="/user/profile">個人中心</a>
                    <a onClick={() => {
                      handleLogout();
                      window.location.href = '/login';
                    }}
                      style={{ cursor: 'pointer' }}
                    >登出</a>
                  </div>
                </div>
              ) : (
                <div className={header["loginBtns"]}>
                  <a href="/login">登入</a>
                  {/* <a href="/register">註冊</a> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
