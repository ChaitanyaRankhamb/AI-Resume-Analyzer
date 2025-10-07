import fs from "fs";
import path from "path";
const pdfParse = require("pdf-parse");
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
const pdf = require("pdf-poppler");

export async function parseResume(file: any): Promise<string> {
  let text = "";

  if (file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    if (pdfData.text.trim().length > 0) {
      text = pdfData.text;
    } else {
      text = await extractTextFromScannedPDF(file.path);
    }
  } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const buffer = fs.readFileSync(file.path);
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else {
    throw new Error("Unsupported file type");
  }

  // Save the extracted text into the parsed-files directory
  const parsedFilesDir = path.resolve(__dirname, "../parsed-files");
  if (!fs.existsSync(parsedFilesDir)) {
    fs.mkdirSync(parsedFilesDir, { recursive: true });
  }
  // Use the original filename with .txt extension
  const baseName = path.parse(file.originalname || file.filename || "resume").name;
  const outputFilePath = path.join(parsedFilesDir, `${baseName}.txt`);
  fs.writeFileSync(outputFilePath, text, "utf-8");

  return text;
}

async function extractTextFromScannedPDF(pdfPath: string): Promise<string> {
  const tempDir = path.resolve(__dirname, "../temp-images");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const options = { format: "png", out_dir: tempDir, out_prefix: "page" };
  await pdf.convert(pdfPath, options);

  const worker = await Tesseract.createWorker();
  let text = "";

  const files = fs.readdirSync(tempDir).filter((f) => f.endsWith(".png"));
  for (const image of files) {
    const { data: { text: pageText } } = await worker.recognize(path.join(tempDir, image));
    text += pageText + "\n";
    fs.unlinkSync(path.join(tempDir, image));
  }

  await worker.terminate();
  fs.rmSync(tempDir, { recursive: true, force: true });

  return text;
}
