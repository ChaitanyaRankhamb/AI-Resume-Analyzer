import type { Request, Response } from "express";
import { parseResume } from "../services/resumeParseServices";
import { cleanAndExtractKeywords } from "../services/nlpServices";
import { matchKeywordsFromResume } from "../services/matchedKeywordsServices";

export async function uploadResume(req: Request, res: Response) {
  try {
    const file = (req as any).file || ((req as any).files?.[0]);
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Step 1: Parse file → get raw text
    const rawText = await parseResume(file);

    // Step 2: Clean, normalize, extract keywords
    const { cleanedText, keywords } = await cleanAndExtractKeywords(rawText);

    const matchedKeywords = matchKeywordsFromResume(keywords);

    res.json({
      message: "File processed successfully",
      keywords
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
