"use client";
import React, { useState } from "react";

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/register.module.css";
import common from "@/styles/common/common.module.css";

export default function RegisterPage() {
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
      <Header />
      <div className={main["main"]}>
        <div className={`${content["wrapper"]} ${main["wrapper"]}`}>
          <div className={main["signup"]}>
            <div className={`${main["signupBox"]} ${common["radius6"]}`}>
              <div className={main["form"]}>
                <form name="form1" noValidate>
                  <ul>
                    <li>
                      <h5>通過電子郵件註冊</h5>
                    </li>
                    {fields.map((field, idx) => {
                      const fieldValue = formData[field.key] || "";
                      const errorText = errors[field.key];
                      const isFocused = focusedField === field.key;
                      return (
                        <li key={idx}>
                          <div className={main["left"]}>{field.label}</div>
                          <div
                            className={main["right"]}
                            style={{ position: "relative" }}
                          >
                            <input
                              className={main["inp"]}
                              type={field.type || "text"}
                              value={fieldValue}
                              onChange={(e) =>
                                handleInputChange(field.key, e.target.value)
                              }
                              onFocus={() => handleFocus(field.key)}
                              onBlur={() => handleBlur(field.key)}
                              autoComplete="off"
                            />
                            {errorText && (
                              <span
                                className={`${main["error"]} ${
                                  isFocused ? main["tip"] : ""
                                }`}
                              >
                                {errorText} <i></i>
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                    <li className={main["pdLeft"]}>
                      <label htmlFor="agreentment">
                        <input
                          type="checkbox"
                          name="agreentment"
                          defaultChecked
                        />
                        我同意 RC語音{" "}
                        <a href="/agreement" target="_blank">
                          服務條款
                        </a>
                        ，我聲明我已經超過13歲。
                      </label>
                    </li>
                    <li className={main["pdLeft"]}>
                      <a
                        className={main["btnSignup"]}
                        href="javascript:;"
                        onClick={handleSubmit}
                      >
                        <span>立即註冊</span>
                      </a>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
