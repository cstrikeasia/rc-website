"use client";
import React from "react";

// CSS
import footer from "@/styles/common/footer.module.css";

export const Footer = () => {
  const partnerLogos = [
    { name: "NCSE Network", logoUrl: "/images/ncse_logo_no_background.png", href: "https://ncse.tw/", alt: "國雲網路NCSE Network" },
  ];

  const footerTextLinks = [
    { label: "常見問題", href: "/faq" },
    { label: "使用條款", href: "/agreement" },
    { label: "平台規範", href: "/specification" },
    { label: "聯絡我們", href: "/contactus" },
  ];


  return (
    <div className={footer["footer"]}>
      <div className={footer["wrapper"]}>
        <div className={footer["logoBar"]}>
          <h3 className={footer["partnerTitle"]}>合作夥伴</h3>
          <div className={footer["partnerLogos"]}>
            {partnerLogos.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className={footer["logoLink"]}>
                <div
                  className={footer["logoImage"]}
                  style={{
                    backgroundImage: `url(${item.logoUrl})`,
                    width: 100,
                    height: 100,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                  title={item.alt}
                  role="img"
                  aria-label={item.alt}
                >
                </div>
              </a>
            ))}
          </div>
        </div>
        <hr className={footer["separatorLine"]} />
        <div className={footer["textInfo"]}>
          {footerTextLinks.length > 0 && (
            <div className={footer["textLinks"]}>
              {footerTextLinks.map(({ label, href }) => (
                <a key={label} href={href} className={footer["textLinkItem"]}>
                  {label}
                </a>
              ))}
            </div>
          )}
          <p className={footer["copyRight"]}>
            Copyright &copy; {new Date().getFullYear()} ricecall.com.tw All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
