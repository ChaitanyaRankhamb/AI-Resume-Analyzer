import natural from "natural";

// Basic clean & normalize
export async function cleanAndExtractKeywords(text: string) {
  // Lowercase & remove special chars
  let cleanedText = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

  // Tokenize
  const tokenizer = new natural.WordTokenizer();
  let tokens = tokenizer.tokenize(cleanedText);

  // Remove stopwords
  const stopwords = natural.stopwords;
  tokens = tokens.filter((t) => !stopwords.includes(t));

  // Frequency map
  const freqMap: Record<string, number> = {};
  tokens.forEach((token) => {
    freqMap[token] = (freqMap[token] || 0) + 1;
  });

  // Sort keywords by frequency
  const keywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 20); // top 20 keywords

  return { cleanedText, keywords };
}
