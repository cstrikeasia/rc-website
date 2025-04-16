"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function TwoFactorPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState("");
  useEffect(() => {
    fetch(`/api/2fa/setup?userId=${userId}&label=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setQrCode(data.qr);
        setSecret(data.secret);
      });
  }, []);
  const handleVerify = async () => {
    if (!secret || token.length !== 6) return;
    const res = await fetch("/api/2fa/verify", {
      method: "POST",
      body: JSON.stringify({ token, userId }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setResult(data.message);
  };
  return (
    <div>
      {qrCode && (
        <Image
          src={qrCode}
          alt="QRCode"
          width={200}
          height={200}
          className="mx-auto"
        />
      )}
      <p>🔐 Secret: {secret}</p>
      <input
        type="text"
        placeholder="請輸入 Google Authenticator 驗證碼"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleVerify}>驗證</button>
      {result && <p>{result}</p>}
    </div>
  );
}
