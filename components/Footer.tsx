"use client";
import React from "react";

// CSS
import footer from "@/styles/common/footer.module.css";

export const Footer = () => {
  const footerLinks = [
    {
      label: "常見問題",
      href: "/faq",
    },
    {
      label: "使用條款協議",
      href: "/agreement",
    },
    {
      label: "RC語音平台規範",
      href: "/specification",
    },
    { label: "聯絡我們", href: "/contactus" },
    {
      label: "問題回報",
      href: "https://discord.gg/adCWzv6wwS",
    },
  ];
  return (
    <div className={footer["footer"]}>
      <div className={footer["wrapper"]}>
        <div>
          {footerLinks.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
        <p className={footer["copyRight"]}>
          Copyright &copy; {new Date().getFullYear()} ricecall.com.tw All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};
