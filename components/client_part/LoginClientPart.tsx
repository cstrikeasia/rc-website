"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/login.module.css";
import common from "@/styles/common/common.module.css";

export default function RegisterPage() {
  const pathname = usePathname();
  const meta = {
    title: "登入",
    description:
      "登入 RC 語音帳號，立即管理您的語音群組、好友列表與個人設定，隨時隨地暢享高品質語音聊天體驗！",
    keywords:
      "RC語音登入, RiceCall帳號, RC會員登入, 語音群管理, RC好友列表, 米飯語音, RC個人設定",
    url: pathname,
  };
  // State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const tips: Record<string, string> = {
    username: "例如：WHuang，Wei.Huang",
    nickname: "請填寫暱稱！",
    password: "最少 6 個字元",
    confirm_password: "請再次輸入相同的密碼",
    email: "請填寫電子信箱",
  };
  const fields = [
    { label: "帳　　號", key: "username" },
    { label: "暱　　稱", key: "nickname" },
    { label: "密　　碼", key: "password", type: "password" },
    { label: "密碼確認", key: "confirm_password", type: "password" },
    { label: "電子郵件", key: "email" },
  ];
  // Effect
  useEffect(() => {
    const usernameInput = document.querySelector<HTMLInputElement>(
      'input[name="username"]'
    );
    const passwordInput = document.querySelector<HTMLInputElement>(
      'input[name="password"]'
    );

    setFormData({
      username: usernameInput?.value || "",
      password: passwordInput?.value || "",
    });
  }, []);
  // Handler
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!value.trim()) {
        return { ...prev, [key]: "必填項" };
      }
      return { ...prev, [key]: "" };
    });
  };
  const handleFocus = (key: string) => {
    setFocusedField(key);
    if (!formData[key]?.trim()) {
      setErrors((prev) => ({ ...prev, [key]: tips[key] }));
    }
  };
  const handleBlur = (key: string) => {
    setFocusedField(null);
    const value = formData[key]?.trim() || "";
    const username = formData["username"] || "";
    const password = formData["password"] || "";
    if (!value) {
      setErrors((prev) => ({ ...prev, [key]: "必填項" }));
      return;
    }
    switch (key) {
      case "username":
        if (value.length < 4 || value.length > 20) {
          setErrors((prev) => ({
            ...prev,
            [key]: "帳號必須為 4~20 字元之內。",
          }));
          return;
        }
        if (!/^[a-zA-Z0-9_.\-@]+$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [key]: "請填寫字母與數字或符號",
          }));
          return;
        }
        break;
      case "nickname":
        const chineseCharCount = Array.from(value).filter((char) =>
          /[\u4e00-\u9fa5]/.test(char)
        ).length;
        if (chineseCharCount > 16) {
          setErrors((prev) => ({
            ...prev,
            [key]: "暱稱不能超過16個中文字",
          }));
          return;
        }
        break;
      case "password":
        if (value.length < 6 || value.length > 20) {
          setErrors((prev) => ({
            ...prev,
            [key]: "請輸入一個長度介於 6 和 20 之間的字元串。",
          }));
          return;
        }
        if (username && value.includes(username)) {
          setErrors((prev) => ({
            ...prev,
            [key]: "密碼不能含有帳號訊息",
          }));
          return;
        }
        if (/^[a-zA-Z]+$/.test(value) || /^[0-9]+$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [key]: "密碼過於簡單",
          }));
          return;
        }
        break;
      case "confirm_password":
        if (value !== password) {
          setErrors((prev) => ({
            ...prev,
            [key]: "您兩次輸入的密碼不符！",
          }));
          return;
        }
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [key]: "請輸入正確格式的電子郵件",
          }));
          return;
        }
        break;

      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    const username = formData["username"] || "";
    const password = formData["password"] || "";
    fields.forEach((field) => {
      const { key } = field;
      const value = formData[key]?.trim() || "";
      if (!value) {
        newErrors[key] = "必填項";
        return;
      }
      switch (key) {
        case "username":
          if (value.length < 4 || value.length > 20) {
            newErrors[key] = "帳號必須為 4~20 字元之內。";
          } else if (!/^[a-zA-Z0-9_.\-@]+$/.test(value)) {
            newErrors[key] = "請填寫字母與數字或符號";
          }
          break;
        case "nickname":
          const chineseCharCount = Array.from(value).filter((char) =>
            /[\u4e00-\u9fa5]/.test(char)
          ).length;
          if (chineseCharCount > 16) {
            newErrors[key] = "暱稱不能超過16個中文字";
          }
          break;
        case "password":
          if (value.length < 6 || value.length > 20) {
            newErrors[key] = "請輸入一個長度介於 6 和 20 之間的字元串。";
          } else if (value.includes(username)) {
            newErrors[key] = "密碼不能含有帳號訊息";
          } else if (/^[a-zA-Z]+$/.test(value) || /^[0-9]+$/.test(value)) {
            newErrors[key] = "密碼過於簡單";
          }
          break;
        case "confirm_password":
          if (value !== password) {
            newErrors[key] = "您兩次輸入的密碼不符！";
          }
          break;
        case "email":
          if (!/^\S+@\S+\.\S+$/.test(value)) {
            newErrors[key] = "請輸入正確格式的電子郵件";
          }
          break;
        default:
          break;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("送出表單");
    }
  };
  return (
    <>
      <div className={main["main"]}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <div className={main["signup"]}>
            <div className={`${main["signupBox"]} ${common["radius6"]}`}>
              <form name="form1" method="post" action="/api/login" noValidate>
                <div className={main["form"]}>
                  <div className={main["formTitle"]}>
                    <strong>登入</strong>
                  </div>
                  <div
                    className={`${main["innerBox"]} ${common["radius4"]} ${main["innerBoxFB2"]}`}
                  >
                    <ul>
                      <li>
                        <span
                          className={`${main["dvl"]} ${
                            focusedField === "username" ? main["dvl_focus"] : ""
                          } ${
                            formData["username"]?.trim()
                              ? main["dvl_hidden"]
                              : ""
                          }`}
                        >
                          RC帳號
                        </span>
                        <input
                          className={main["inp"]}
                          type="text"
                          name="username"
                          value={formData["username"] || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          onFocus={() => setFocusedField("username")}
                          onBlur={() => setFocusedField(null)}
                        />
                      </li>
                      <li>
                        <span
                          className={`${main["dvl"]} ${
                            focusedField === "password" ? main["dvl_focus"] : ""
                          } ${
                            formData["password"]?.trim()
                              ? main["dvl_hidden"]
                              : ""
                          }`}
                        >
                          登入密碼
                        </span>
                        <input
                          className={main["inp"]}
                          type="password"
                          name="password"
                          value={formData["password"] || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          onFocus={() => setFocusedField("password")}
                          onBlur={() => setFocusedField(null)}
                        />
                      </li>
                      <li className={main["forgetPassword"]}>
                        <a href="/forget" target="_blank">
                          忘記密碼了？
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className={main["center"]}>
                    <a
                      className={`${main["btnSignup"]} ${main["submit"]}`}
                      href="javascript:;"
                    >
                      <span>登　入</span>
                    </a>
                  </div>
                  <div className={`${main["center"]} ${main["noAccount"]}`}>
                    你還不是RC會員嗎？
                    <a className={main["registerLink"]} href="/register">
                      趕緊註冊吧！
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
