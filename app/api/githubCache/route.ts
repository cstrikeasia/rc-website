let cachedData: { url: string; version: string } = { url: "", version: "" };
async function fetchGitHubRelease() {
    try {
        const res = await fetch(
            "https://api.github.com/repos/NerdyHomeReOpen/RiceCall/releases/latest",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    "User-Agent": "RiceCall-Agent",
                },
            }
        );
        if (!res.ok) throw new Error(`Github API 請求失敗：${res.status}`);
        const data = await res.json();
        const asset = data.assets.find((item: any) => item.name.endsWith(".exe"));
        cachedData = {
            url: asset?.browser_download_url || "",
            version: data.tag_name || data.name || "",
        };
        console.log("已更新 GitHub Release 資料：", cachedData);
    } catch (err) {
        console.error("拉取 GitHub Release 失敗：", err);
    }
}
fetchGitHubRelease();
setInterval(fetchGitHubRelease, 1000 * 60 * 60);
export function getCachedRelease() {
    return cachedData;
}
