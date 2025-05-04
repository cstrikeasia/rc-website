"use client";
import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/contactus.module.css";
export default function ContactUsPage() {
  const contacts = [
    {
      title: "主開發",
      contact: "JoshHuang9508",
      info: [{ label: "Github", value: "JoshHuang9508" }, { label: "Discord", value: "614396443016560649" }],
    },
    {
      title: "主開發",
      contact: "yeci226",
      info: [{ label: "Github", value: "yeci226" }, { label: "Discord", value: "283946584461410305" }],
    },
    {
      title: "後端開發",
      contact: "lekoOwO",
      info: [{ label: "Github", value: "lekoOwO" }, { label: "Discord", value: "108153734541942784" }],
    },
    {
      title: "前端開發",
      contact: "cablate",
      info: [{ label: "Github", value: "cablate" }, { label: "Discord", value: "337525692356886538" }],
    },
    {
      title: "前端開發",
      contact: "cstrikeasia",
      info: [{ label: "Github", value: "cstrikeasia" }, { label: "Discord", value: "789742073036144640" }],
    },
    {
      title: "前端開發",
      contact: "rytlebsk",
      info: [{ label: "Github", value: "rytlebsk" }, { label: "Discord", value: "" }],
    },
    {
      title: "伺服器架設",
      contact: "Cooookie16",
      info: [{ label: "Github", value: "Cooookie16" }, { label: "Discord", value: "370537724362620930" }],
    },
    {
      title: "伺服器架設",
      contact: "yayacat",
      info: [{ label: "Github", value: "yayacat" }, { label: "Discord", value: "107918754251325440" }],
    },
    {
      title: "技術指導",
      contact: "orlys",
      info: [{ label: "Github", value: "Orlys" }, { label: "Discord", value: "385825577698983937" }],
    },
    {
      title: "技術指導",
      contact: "5026",
      info: [{ label: "Github", value: "SN-Koarashi" }, { label: "Discord", value: "198418020329062400" }],
    },
  ];

  type JobTitle = "主開發" | "後端開發" | "前端開發" | "伺服器架設" | "技術指導";

  const titleColorClasses: Record<JobTitle, string> = {
    "主開發": main.title主開發,
    "後端開發": main.title後端開發,
    "前端開發": main.title前端開發,
    "伺服器架設": main.title伺服器架設,
    "技術指導": main.title技術指導,
  };

  return (
    <>
      <div className={`${content["main"]} ${main["main"]}`}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <h2>聯絡我們</h2>
          <div className={`${content["content"]} ${main["content"]}`}>
            {contacts.map(({ title, contact, info }, idx) => (
              <div key={idx} className={`${main.contactCard}`}>
                <div>
                  {contact && (
                    <div className={main["userInfo"]}>
                      <div className={main.contactNameGroup}>
                        <span className={`${main.developerTitle} ${titleColorClasses[title as JobTitle] || ''}`}>{title}</span>
                        {' '}
                        {contact}
                      </div>
                      <div className={main.iconGroup}>
                        {(() => {
                          const githubInfo = info.find(item => item.label === "Github" && item.value);
                          if (githubInfo) {
                            const githubUrl = `https://github.com/${githubInfo.value}`;
                            return (
                              <a
                                href={githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={main.githubIconLink}
                                title="GitHub"
                              >
                                <FaGithub size={20} />
                              </a>
                            );
                          }
                          return null;
                        })()}
                        {(() => {
                          const discordInfo = info.find(item => item.label === "Discord");
                          if (discordInfo) {
                            const discordUrl = `http://discordapp.com/users/${discordInfo.value}`;
                            return (
                              <a
                                href={discordUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={main.discordIconLink}
                                title="Discord"
                              >
                                <FaDiscord size={20} />
                              </a>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
