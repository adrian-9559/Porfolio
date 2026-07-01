export const getWebsiteImage = (url: string) => {
  const domain = new URL(url).hostname;

  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};

const cleanText = (value: string) =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getMetaContent = (html: string, name: string) => {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["'][^>]*>`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);

    if (match?.[1]) {
      return cleanText(match[1]);
    }
  }

  return null;
};

export const getWebsiteInfo = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const html = await response.text();
    const title = cleanText(
      html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "",
    );
    const description =
      getMetaContent(html, "description") ||
      getMetaContent(html, "og:description") ||
      getMetaContent(html, "twitter:description");

    return {
      title: title || null,
      description,
    };
  } catch {
    return { title: null, description: null };
  } finally {
    clearTimeout(timeout);
  }
};
