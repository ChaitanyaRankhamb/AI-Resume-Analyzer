import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require("pdf-parse");
import mammoth = require("mammoth"); // For DOCX parsing

export async function getStatus(_req: Request, res: Response): Promise<void> {
  res.json({ ok: true });
}

export async function uploadResume(req: Request, res: Response): Promise<void> {
  // Multer stores uploaded files in req.file (for single) or req.files (for multiple)
  const file =
    (req as any).file ||
    (Array.isArray((req as any).files) ? (req as any).files[0] : undefined);

  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  // Ensure parsed-pdfs/docs directory exists
  const parsedDir = path.resolve(__dirname, "../parsed-files");
  if (!fs.existsSync(parsedDir)) {
    fs.mkdirSync(parsedDir, { recursive: true });
  }

  try {
    let text = "";
    let txtName = file.originalname;

    if (file.mimetype === "application/pdf") {
      // PDF parsing
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
      txtName = txtName.replace(/\.pdf$/i, ".txt");
    } else if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
      file.mimetype === "application/msword" // .doc
    ) {
      // DOC/DOCX parsing
      if (file.mimetype === "application/msword") {
        // Optional: For .doc files, you may need another parser or conversion to .docx first
        throw new Error(".doc files are not supported yet. Please upload .docx");
      }

      const buffer = fs.readFileSync(file.path);
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
      txtName = txtName.replace(/\.docx$/i, ".txt");
    } else {
      throw new Error("Unsupported file type");
    }

    // Save extracted text
    fs.writeFileSync(path.join(parsedDir, txtName), text);

    console.log("File converted to text successfully!");
    res.json({
      message: "File uploaded successfully",
      fileInfo: {
        originalName: file.originalname,
        storedAs: file.filename,
        type: file.mimetype,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        path: file.path,
      },
    });
  } catch (error) {
    // Delete uploaded file if conversion fails
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
      console.log("Uploaded file deleted due to conversion failure.");
    }

    res.status(500).json({ error: (error as Error).message || "Failed to parse file" });
  }
}
