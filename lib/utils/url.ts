
export function normalizeRssUrl(url: string): string {
    const trimmedUrl = url.trim();
  
    if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
      return trimmedUrl;
    }
  
    return `https://${trimmedUrl}`;
  }