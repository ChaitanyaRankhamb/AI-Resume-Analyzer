import { resumeKeywords } from "../lib/data/resumeKeywords";

export function matchKeywordsFromResume(cleanedKeywords: string[]) {
  // Initialize result object with the same keys but empty arrays
  const matchedKeywords: Record<string, string[]> = {};
  for (const category in resumeKeywords) {
    matchedKeywords[category] = [];
  }

  // Convert cleanedKeywords to lowercase for case-insensitive matching
  const keywordSet = new Set(cleanedKeywords.map(k => k.toLowerCase()));

  // Iterate over each category in resumeKeywords
  for (const category in resumeKeywords) {
    const categoryKeywords = resumeKeywords[category as keyof typeof resumeKeywords];
    // Check which words exist in the cleaned keywords
    const matches = (categoryKeywords as string[]).filter((kw: string) => keywordSet.has(kw.toLowerCase()));
    matchedKeywords[category] = matches;
  }

  return matchedKeywords;
}
