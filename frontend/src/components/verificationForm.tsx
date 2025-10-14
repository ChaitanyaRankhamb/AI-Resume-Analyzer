"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function VerificationForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email") || "");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: Number(code), email }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Email verified successfully!");
      } else {
        setError(data.message || "Verification failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/email/resendVerify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setSuccess("A new verification code has been sent to your email.");
      } else {
        setError(data.message || "Failed to resend verification code.");
      }
    } catch (err) {
      setError("Failed to resend verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-muted to-background transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-[360px] shadow-2xl border border-border/60 backdrop-blur-xl bg-card/90 rounded-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <MailCheck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold text-foreground">
              Verify Your Email
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              A verification code has been sent to your email. <br />
              Please enter it below to continue.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <Input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="text-center tracking-widest text-lg py-6 bg-background border-border focus-visible:ring-primary"
                disabled={loading}
              />

              {/* Error Message */}
              {error && (
                <>
                  <p className="text-sm text-red-500 text-center">{error}</p> 
                </>
              )}

              {/* Success Message */}
              {success && (
                <>
                  <p className="text-sm text-green-500 text-center">
                    {success}
                  </p>
                  {typeof window !== "undefined" &&
                    setTimeout(() => {
                      window.location.href = "http://localhost:3000/sign-in";
                    }, 1500)}
                </>
              )}

              <Button
                type="submit"
                className="w-full font-medium text-base py-5 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Processing..." : "Verify"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              Didn’t receive a code?{" "}
              <span
                className={`text-primary font-medium cursor-pointer hover:underline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleResendVerification}
              >
                Resend
              </span>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
