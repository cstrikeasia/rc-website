"use client";
import React from "react";

// CSS
import footer from "@/styles/common/footer.module.css";

export const Footer = () => {
  const footerLinks = [
    {
      label: "常見問題",
      href: "/faq",
      target: "",
    },
    {
      label: "使用條款協議",
      href: "/agreement",
      target: "",
    },
    {
      label: "RC語音平台規範",
      href: "/specification",
      target: "",
    },
    { label: "聯絡我們", href: "/contactus", target: "" },
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
  ];
  return (
    <div className={footer["footer"]}>
      <div className={footer["wrapper"]}>
        <div>
          {footerLinks.map(({ label, href, target }) => (
            <a
              key={label}
              href={href}
              target={target}
              rel={target === "_blank" ? "noreferrer" : undefined}
            >
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
