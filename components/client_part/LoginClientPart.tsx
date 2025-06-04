"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/login.module.css";
import common from "@/styles/common/common.module.css";

export default function LoginClientPart() {
  const { handleLogin } = useAuth();
  // State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
  };
  const handleBlur = (key: string) => {
    setFocusedField(null);
    const value = formData[key]?.trim() || "";
    const errorMsg = handleValidateField(key, value);
    setErrors(prev => ({ ...prev, [key]: errorMsg }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: Record<string, string> = {};
    const username = formData["username"] || "";
    const password = formData["password"] || "";
    const fields = [
      { label: "帳　　號", key: "username" },
      { label: "密　　碼", key: "password", type: "password" },
    ];
    fields.forEach((field) => {
      const { key } = field;
      const value = formData[key]?.trim() || "";
      const errorMsg = handleValidateField(key, value);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("/api/login", {
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
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          if (data.token && data.userId) {
            handleLogin(data.token, data.userId);
            window.location.href = "/user/profile";
          }
        } else {
          alert(data?.error?.message || "登入失敗");
        }
      } catch (error: any) {
        alert(`登入失敗，請稍後再試，錯誤訊息：${error}`);
      }
    }
  };
  const handleValidateField = (key: string, value: string): string => {
    if (!value) {
      return "必填項";
    }
    switch (key) {
      case "username":
        if (value.length < 4 || value.length > 20) {
          return "帳號必須為 4~20 字元之內。";
        }
        if (!/^[a-zA-Z0-9_.\-@]+$/.test(value)) {
          return "請填寫字母與數字或符號";
        }
        break;
      case "password":
        if (value.length < 6 || value.length > 20) {
          return "請輸入一個長度介於 6 和 20 之間的字元串。";
        }
        break;
      default:
        break;
    }
    return "";
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
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSubmit(e);
                            }
                          }}
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
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSubmit(e);
                            }
                          }}
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
