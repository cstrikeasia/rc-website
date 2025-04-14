"use client";
import React from "react";

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/contactus.module.css";

export default function ContactUsPage() {
  const contacts = [
    {
      title: "主開發",
      contact: "JoshHuang9508",
      info: [{ label: "Github", value: "https://github.com/JoshHuang9508/" }],
    },
    {
      title: "主開發",
      contact: "yeci226",
      info: [{ label: "Github", value: "https://github.com/yeci226/" }],
    },
    {
      title: "後端開發",
      contact: "lekoOwO",
      info: [{ label: "Github", value: "https://github.com/lekoOwO/" }],
    },
    {
      title: "前端開發",
      contact: "cablate",
      info: [{ label: "Github", value: "https://github.com/cablate/" }],
    },
    {
      title: "前端開發",
      contact: "cstrikeasia",
      info: [{ label: "Github", value: "https://github.com/cstrikeasia/" }],
    },
    {
      title: "前端開發",
      contact: "rytlebsk",
      info: [{ label: "Github", value: "https://github.com/rytlebsk/" }],
    },
    {
      title: "伺服器架設",
      contact: "Cooookie16",
      info: [{ label: "Github", value: "https://github.com/Cooookie16/" }],
    },
    {
      title: "伺服器架設",
      contact: "yayacat",
      info: [{ label: "Github", value: "https://github.com/yayacat/" }],
    },
  ];
  return (
    <>
      <Header />
      <div className={`${content["main"]} ${main["main"]}`}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <h2>聯絡我們</h2>
          <div className={content["content"]}>
            {contacts.map(({ title, contact, info }, idx) => (
              <div key={idx} className={content["contactInfo"]}>
                <h3>
                  <strong>{title}</strong>
                </h3>
                <ul>
                  {contact && (
                    <li>
                      <div className={content["title"]}>連絡人:</div>
                      <div className={content["content"]}>{contact}</div>
                    </li>
                  )}
                  {info.map((item, i) => (
                    <li key={i}>
                      <div className={content["title"]}>{item.label}:</div>
                      <div className={content["content"]}>
                        {/^https?:\/\//.test(item.value) ? (
                          <a href={item.value} target="_blank" rel="noreferrer">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
