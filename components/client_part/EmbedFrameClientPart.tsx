"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/styles/translatePage.module.css';

export default function EmbedFrameClientPart() {
    const searchParams = useSearchParams();
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const targetUrl = searchParams.get('target');

        if (targetUrl) {
            try {
                const decodedUrl = decodeURIComponent(targetUrl);
                new URL(decodedUrl);

                if (decodedUrl.includes("twitch.tv/") && !decodedUrl.includes("/embed/")) {
                    setError("嵌入 Twitch 內容時，請確認您提供的是 Twitch 的官方嵌入網址 (通常包含 /embed/)，而不是頻道主頁。");
                    setEmbedUrl(null);
                    setIsLoading(false);
                    return;
                }
                if (decodedUrl.includes("youtube.com/") && decodedUrl.includes("/watch?v=") && !decodedUrl.includes("/embed/")) {
                    setError("嵌入 YouTube 影片時，建議使用官方的嵌入網址 (通常格式為 youtube.com/embed/VIDEO_ID)。");
                }

                setEmbedUrl(decodedUrl);
                setError(null);
            } catch (e) {
                console.error("Invalid target URL:", e);
                setError("提供的目標網址無效或格式不正確。請檢查後重試。");
                setEmbedUrl(null);
            }
        } else {
            setError("請在網址中提供 'target' 參數以指定要嵌入的內容。");
            setEmbedUrl(null);
        }
        setIsLoading(false);
    }, [searchParams]);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>正在處理請求...</p>
            </div>
        );
    }

    if (error) {
        const yourDomain = "ricecall.com.tw";
        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : `https://${yourDomain}`;

        const exampleTwitchChannelForChat = "yourtwitchchannel";
        const twitchParentDomain = encodeURIComponent(yourDomain);
        const rawTwitchChatUrl = `https://www.twitch.tv/embed/${exampleTwitchChannelForChat}/chat?parent=${twitchParentDomain}`;
        const encodedTwitchChatUrlForTarget = encodeURIComponent(rawTwitchChatUrl);
        const fullTwitchChatExampleLink = `${currentOrigin}/translate?target=${encodedTwitchChatUrlForTarget}`;

        const exampleTwitchChannelForPlayer = "anotherchannel";
        const rawTwitchPlayerUrl = `https://player.twitch.tv/?channel=${exampleTwitchChannelForPlayer}&parent=${twitchParentDomain}&autoplay=true&muted=true`; // Added autoplay and muted
        const encodedTwitchPlayerUrlForTarget = encodeURIComponent(rawTwitchPlayerUrl);
        const fullTwitchPlayerExampleLink = `${currentOrigin}/translate?target=${encodedTwitchPlayerUrlForTarget}`;

        const exampleYouTubeVideoId = "YOUR_YOUTUBE_VIDEO_ID";
        const rawYouTubeEmbedUrl = `https://www.youtube.com/embed/${exampleYouTubeVideoId}?autoplay=1`;
        const encodedYouTubeEmbedUrlForTarget = encodeURIComponent(rawYouTubeEmbedUrl);
        const fullYouTubeExampleLink = `${currentOrigin}/translate?target=${encodedYouTubeEmbedUrlForTarget}`;

        return (
            <div className={styles.container}>
                <p className={styles.errorText}>{error}</p>
                <div className={styles.usageExample}>
                    <h4>使用說明：</h4>
                    <ol>
                        <li>從目標服務 (如 Twitch, YouTube) 取得其官方的 **嵌入網址 (Embed URL)**。</li>
                        <li>對該嵌入網址進行完整的 URL 編碼 (URL Encode)。可以搜尋「URL Encoder」線上工具。</li>
                        <li>將編碼後的網址作為 `target` 參數附加到本頁面網址後方。</li>
                    </ol>

                    <h5>Twitch 聊天室範例：</h5>
                    <p>(將 `{exampleTwitchChannelForChat}` 替換為您的 Twitch 頻道名稱)</p>
                    <p>Twitch 聊天室嵌入連結 (原始，未編碼):</p>
                    <code>{rawTwitchChatUrl}</code>
                    <p>對上述連結進行 URL 編碼後，組合成完整的嵌入請求連結：</p>
                    <code>{fullTwitchChatExampleLink}</code>
                    <hr />

                    <h5>Twitch 直播播放器範例：</h5>
                    <p>(將 `{exampleTwitchChannelForPlayer}` 替換為您的 Twitch 頻道名稱)</p>
                    <p>Twitch 直播播放器嵌入連結 (原始，未編碼):</p>
                    <code>{rawTwitchPlayerUrl}</code>
                    <p>對上述連結進行 URL 編碼後，組合成完整的嵌入請求連結：</p>
                    <code>{fullTwitchPlayerExampleLink}</code>
                    <hr />

                    <h5>YouTube 直播/影片播放器範例：</h5>
                    <p>(將 `{exampleYouTubeVideoId}` 替換為您的 YouTube 影片 ID)</p>
                    <p>YouTube 影片嵌入連結 (原始，未編碼):</p>
                    <code>{rawYouTubeEmbedUrl}</code>
                    <p>對上述連結進行 URL 編碼後，組合成完整的嵌入請求連結：</p>
                    <code>{fullYouTubeExampleLink}</code>

                    <p style={{ marginTop: "15px" }}><strong>重要提醒：</strong></p>
                    <ul>
                        <li>許多服務 (如 Twitch) 要求在其嵌入網址中包含 `parent` (或其他類似名稱的) 參數，該參數值必須是您的網站域名 (本站為 `{yourDomain}`)。</li>
                        <li>如果目標網站設定了 `X-Frame-Options` 或 `Content-Security-Policy` 阻止跨域嵌入，則無法在此處顯示其內容，這並非本服務可以控制。</li>
                        <li>請務必使用目標服務提供的 **官方嵌入方式與網址**。</li>
                    </ul>
                </div>
            </div>
        );
    }

    if (!embedUrl) {
        return (
            <div className={styles.container}>
                <p>發生未知錯誤，無法確定嵌入網址。</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <iframe
                id="embed-iframe"
                src={embedUrl}
                className={styles.embedFrame}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                title="嵌入內容"
            ></iframe>
        </div>
    );
} 