import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function suggestFeedsByAI(category: string) {
  const prompt = `
Kullanıcı '${category}' kategorisi için RSS feed önerisi istiyor.
Türkiye'den ve kaliteli kaynaklardan 5 tane öner. 
Sadece şu formatta cevap ver:

[
  { "name": "Site Adı", "url": "https://..." },
  ...
]
`;

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  try {
    return JSON.parse(result.text);
  } catch {
    return [];
  }
}
