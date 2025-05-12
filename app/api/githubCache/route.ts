// let cachedData: { url: string; version: string } = { url: "", version: "" };

import { assert } from "console";


interface GitHubRelease {
    url: string;
    assets_url: string;
    upload_url: string;
    html_url: string;
    id: number;
    author: any;
    node_id: string;
    tag_name: string;
    target_commitish: string;
    name: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string;
    assets: GitHubAsset[];
    tarball_url: string;
    zipball_url: string;
    body: string;
}

interface GitHubAsset {
    url: string;
    id: number;
    node_id: string;
    name: string;
    label: string | null;
    uploader: object | null;
    content_type: string;
    state: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
}

interface ReleaseData {
    fileType: string;
    url: string | null;
    version: string | null;
}

let cachedData: GitHubRelease | null = null;

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
        cachedData = await res.json();
        console.log("已更新 GitHub Release 資料：");
    } catch (err) {
        console.error("拉取 GitHub Release 失敗：", err);
    }
}

fetchGitHubRelease();
setInterval(fetchGitHubRelease, 1000 * 60 * 60);

export function getCachedReleaseData() : ReleaseData[] {
    if (!cachedData) {
        console.error("GitHub Release 資料尚未更新");
        return [];
    }

    let version = cachedData.tag_name;

    return cachedData.assets.map((asset => {
        return {
            fileType: asset.name.split(".").pop() || "",
            url: asset.browser_download_url,
            version: version
        }
    }));
}
