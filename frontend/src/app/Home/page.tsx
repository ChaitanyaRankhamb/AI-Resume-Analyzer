"use client";

import { useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Trigger the hidden input programmatically
  const handleBrowse = (): void => {
    inputRef.current?.click();
  };

  // Capture file selection (supports multiple)
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const allowed = ["pdf", "doc", "docx"];
    const toExtension = (name: string): string =>
      (name.split(".").pop() || "").toLowerCase();
    const validFiles = files.filter((f) =>
      allowed.includes(toExtension(f.name))
    );
    const hasInvalid = files.length > 0 && validFiles.length !== files.length;

    setSelectedFiles(validFiles);
    if (hasInvalid) {
      setIsError(true);
      setMessage("Only PDF, DOC, and DOCX files are allowed");
    } else {
      setIsError(false);
      setMessage(null);
    }
  };

  // Upload files to backend using Fetch + FormData
  const handleUpload = async (): Promise<void> => {
    if (!selectedFiles.length) {
      setIsError(true);
      setMessage("Please select at least one file.");
      return;
    }
    setIsUploading(true);
    setMessage(null);
    setIsError(false);
    try {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("files", file);
      }

      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.error || data?.message || "Upload failed");
      setMessage(
        `Uploaded ${
          data.files?.length ?? selectedFiles.length
        } file(s) successfully.`
      );
      setIsError(false);
      setSelectedFiles([]);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err: any) {
      setIsError(true);
      setMessage(err?.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 antialiased px-6 py-16">
      <main className="mx-auto max-w-3xl">
        <div className="backdrop-blur-md bg-card/80 border border-border rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            AI Resume Analyzer
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upload one or more files (PDF, DOC, DOCX). We'll process them
            securely on the server.
          </p>
          <small className="text-muted-foreground">File size limit: 10MB</small>

          <div className="mt-8 grid gap-6">
            {/* File dropzone-style card */}
            <div className="rounded-xl border border-border bg-card/50 p-6 transition-colors">
              <div className="flex flex-col items-center justify-center text-center gap-4">
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleSelect}
                  className="hidden"
                />
                <div className="w-full">
                  <button
                    type="button"
                    onClick={handleBrowse}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium
                               bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg
                               hover:brightness-110 active:scale-[0.98] transition-transform disabled:opacity-60"
                    disabled={isUploading}
                  >
                    Browse files
                  </button>
                </div>

                {selectedFiles.length > 0 && (
                  <ul className="w-full text-left text-foreground/90 text-sm bg-muted/50 rounded-lg p-4 border border-border">
                    {selectedFiles.map((f) => (
                      <li key={f.name} className="truncate">
                        {f.name}{" "}
                        <span className="text-muted-foreground">
                          ({Math.ceil(f.size / 1024)} KB)
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  onClick={handleUpload}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium
                             bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-colors
                             disabled:opacity-60"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>

                {message && (
                  <div className="w-full">
                    <div
                      className={
                        isError
                          ? "flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-destructive/30 bg-destructive/10 text-destructive"
                          : "flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-primary/30 bg-primary/10 text-primary"
                      }
                    >
                      {isError ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 .75a9.25 9.25 0 1 0 0 18.5A9.25 9.25 0 0 0 10 .75ZM9 6.75a1 1 0 1 1 2 0v4.5a1 1 0 1 1-2 0v-4.5ZM10 15a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 10 15Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-7.5 9.5a.75.75 0 0 1-1.118.06l-4-4a.75.75 0 0 1 1.06-1.06l3.38 3.38 6.99-8.857a.75.75 0 0 1 1.045-.075Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span>{message}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
