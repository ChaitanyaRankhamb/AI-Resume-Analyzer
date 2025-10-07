import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadResume } from "../controllers/uploadController";

const router = Router();

// Ensure uploads directory exists at a stable path: backend/uploads
const uploadsDir = path.resolve(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const safeOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${timestamp}-${safeOriginal}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Accept either `file` or `resume` fields
router.post("/upload", upload.any(), uploadResume);

// Multer error handling for this router
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NextFunction, Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: err.message, code: err.code });
      return;
    }
    const message = (err as { message?: string }).message || "Upload failed";
    res.status(500).json({ error: message });
  }
);

export default router;
