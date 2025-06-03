"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/login.module.css";
import common from "@/styles/common/common.module.css";

export default function LoginClientPart() {
  const pathname = usePathname();
  const { login } = useAuth();
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
  const [isMobile, setIsMobile] = useState(false);
  const tips: Record<string, string> = {
    username: "例如：WHuang，Wei.Huang",
    nickname: "請填寫暱稱！",
    password: "最少 6 個字元",
    confirm_password: "請再次輸入相同的密碼",
    email: "請填寫電子信箱",
  };
  const fields = [
    { label: "帳　　號", key: "username" },
    { label: "密　　碼", key: "password", type: "password" },
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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    let errorMsg = "";
    if (!value) {
      errorMsg = "必填項";
    } else {
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
        case "password":
          if (value.length < 6 || value.length > 20) {
            setErrors((prev) => ({
              ...prev,
              [key]: "請輸入一個長度介於 6 和 20 之間的字元串。",
            }));
            return;
          }
          break;
        default:
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [key]: errorMsg }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
        case "password":
          if (value.length < 6 || value.length > 20) {
            setErrors((prev) => ({
              ...prev,
              [key]: "請輸入一個長度介於 6 和 20 之間的字元串。",
            }));
            return;
          }
          break;
        default:
          break;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("https://test.ricecall.com.tw/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account: username,
            password: password,
            rememberAccount: false,
            autoLogin: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          login(data.token);
          alert("登入成功！");
          window.location.href = "/";
        } else {
          const errorData = await response.json();
          alert(errorData?.error?.message || "登入失敗");
        }
      } catch (error) {
        alert(`登入請求失敗，請稍後再試，錯誤訊息：${error}`);
      }
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
                            !isMobile && formData["username"]?.trim()
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
                            handleInputChange("username", e.target.value)
                          }
                          onFocus={() => handleFocus("username")}
                          onBlur={() => handleBlur("username")}
                        />
                        {errors["username"] && (
                          <span
                            className={`${main["error"]} ${
                              focusedField === "username" ? main["tip"] : ""
                            }`}
                          >
                            {errors["username"]} <i></i>
                          </span>
                        )}
                      </li>
                      <li>
                        <span
                          className={`${main["dvl"]} ${
                            focusedField === "password" ? main["dvl_focus"] : ""
                          } ${
                            !isMobile && formData["password"]?.trim()
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
                            handleInputChange("password", e.target.value)
                          }
                          onFocus={() => handleFocus("password")}
                          onBlur={() => handleBlur("password")}
                        />
                        {errors["password"] && (
                          <span
                            className={`${main["error"]} ${
                              focusedField === "password" ? main["tip"] : ""
                            }`}
                          >
                            {errors["password"]} <i></i>
                          </span>
                        )}
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
                      onClick={handleSubmit}
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
