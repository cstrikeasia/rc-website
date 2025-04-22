"use client";
import React, { useState } from "react";
import Link from "next/link";

// CSS
import header from "@/styles/common/header.module.css";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: "首頁", href: "/" },
    {
      label: "Discord",
      href: "https://discord.gg/adCWzv6wwS",
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
          <Link href="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
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
              <Link
                key={label}
                className={header["navBtn"]}
                href={href}
                target={target}
                rel={target === "_blank" ? "noreferrer" : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
          {/* <div className={header["buttons"]}>
            <div className={header["pay"]}>
              <Link href="/rcpay" target="_blank" rel="noreferrer">
                儲值
              </Link>
            </div>
            <div className={header["loginGroup"]}>
              <div className={header["loginBtns"]}>
                <Link href="/login">登入</Link>
                <Link href="/register">註冊</Link>
              </div>
              <div className={header["loginInfo"]}>
                <span></span>
                <div>
                  <Link href="/profile">個人中心</Link>
                  <Link href="/show">個人秀</Link>
                  <Link href="/logout">登出</Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
