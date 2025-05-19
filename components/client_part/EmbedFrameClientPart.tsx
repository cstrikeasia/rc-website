"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/styles/translatePage.module.css';

export default function EmbedFrameClientPart() {
    const searchParams = useSearchParams();
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const targetUrl = searchParams.get('target');

        if (targetUrl) {
            try {
                const decodedUrl = decodeURIComponent(targetUrl);
                new URL(decodedUrl);
                setEmbedUrl(decodedUrl);
                setError(null);
            } catch (e) {
                console.error("Invalid target URL:", e);
                setError("提供的目標網址無效。");
                setEmbedUrl(null);
            }
        } else {
            setError("請在網址中提供 'target' 參數以指定要嵌入的內容，例如：/translate?target=ENCODED_URL");
            setEmbedUrl(null);
        }
    }, [searchParams]);

    if (error) {
        const exampleTwitchChannel = "yourchannel";
        const encodedParentDomain = encodeURIComponent("ricecall.com.tw");
        const exampleTargetUrl = `https://www.twitch.tv/embed/${exampleTwitchChannel}/chat?parent=${encodedParentDomain}`;
        const encodedExampleTargetUrl = encodeURIComponent(exampleTargetUrl);
        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ricecall.com';

        return (
            <div className={styles.container}>
                <p className={styles.errorText}>{error}</p>
                <div className={styles.usageExample}>
                    <h4>使用範例：</h4>
                    <p>嵌入 Twitch 聊天室 (請將 `{exampleTwitchChannel}` 替換為實際頻道名稱):</p>
                    <code>
                        {`${currentOrigin}/translate?target=${encodedExampleTargetUrl}`}
                    </code>
                    <p><strong>重要：</strong>上述範例中的 `parent` 參數已設定為 `ricecall.com.tw`。如果您嵌入的服務需要 `parent` 參數，請確保它指向允許嵌入的域名。</p>
                </div>
            </div>
        );
    }

    if (!embedUrl) {
        return (
            <div className={styles.container}>
                <p>正在載入嵌入內容...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <iframe
                src={embedUrl}
                className={styles.embedFrame}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                title="嵌入內容"
            ></iframe>
        </div>
    );
} 