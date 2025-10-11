"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Github, Eye, EyeOff, Mail, User, Lock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import VerificationForm from "@/components/verificationForm";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one digit.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character."
    ),
});

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<{
    open: boolean;
    type: "success" | "error";
    message: React.ReactNode;
  } | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: any) {
    // Show "creating account" modal
    setModal({
      open: true,
      type: "success",
      message: (
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-6 h-6 animate-spin text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <div>
              <span className="font-semibold text-primary">{values.email}</span>
              <span className="ml-2 text-muted-foreground">
                is creating account...
              </span>
            </div>
          </div>
          <div className="text-[15px] text-muted-foreground text-center">
            Please wait while we create your account.
          </div>
        </div>
      ),
    });
    setIsSubmitting(true);

    try {
      // Defensive: client-side check for required fields.
      if (!values.username || !values.email || !values.password) {
        setModal({
          open: true,
          type: "error",
          message: (
            <div className="p-4 text-center">
              <div className="font-medium text-destructive mb-2">
                Please fill in all fields.
              </div>
              <Button className="mt-2 w-full">
                OK
              </Button>
            </div>
          ),
        });
        setIsSubmitting(false);
        return;
      }

      // Make signup request
      const res = await fetch("http://localhost:4000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.success) {
        setModal({
          open: true,
          type: "success",
          message: (
            <div className="p-5 flex flex-col items-center gap-2">
              <span className="font-semibold text-primary">{values.email}</span>
              <div className="text-lg font-medium text-primary mt-1">
                {data.message}
              </div>
              <div className="text-base text-muted-foreground mt-2">
                A verification code has been sent to your email.
                <br />
                Click OK to enter your code and verify your account.
              </div>
            </div>
          ),
        });
        setUserEmail(data.user.email);
      } else {
        setModal({
          open: true,
          type: "error",
          message: (
            <div className="p-4 text-center">
              <div className="font-semibold text-primary">{values.email}</div>
              <div className="text-destructive mt-2 mb-2">
                {data?.message || "Failed to create account."}
              </div>
            </div>
          ),
        });
      }
    } catch (error: any) {
      setModal({
        open: true,
        type: "error",
        message: (
          <div className="p-4 text-center">
            <div className="font-semibold text-primary">{values.email}</div>
            <div className="text-destructive mt-2 mb-2">
              {error?.message || "Error during sign up. Please try again."}
            </div>
          </div>
        ),
      });
      // Console log for debugging
      console.error("Sign up error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4 relative overflow-hidden">
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <FileText className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 blur-sm -z-10" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </div>
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Create Account
          </motion.h1>
        </motion.div>
        {/* Form Card */}
        <motion.div
          className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {/* Social Sign Up Buttons */}
          <motion.div
            className="flex justify-between items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.button
              type="button"
              className="flex items-center justify-center w-full gap-3 py-3 px-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group"
              onClick={() => (window.location.href = "/api/auth/oauth/google")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="group-hover:text-primary transition-colors flex items-center gap-2">
                <FcGoogle className="w-5 h-5" />
                Google
              </span>
            </motion.button>

            <motion.button
              type="button"
              className="flex items-center justify-center w-full gap-3 py-3 px-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group"
              onClick={() => (window.location.href = "/api/auth/oauth/github")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="group-hover:text-primary transition-colors flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub
              </span>
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="flex items-center my-2"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="mx-4 text-sm text-muted-foreground font-medium">
              or
            </span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                      Username
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your username"
                          className="pl-10 h-12 rounded-xl border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                          {...field}
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          className="pl-10 h-12 rounded-xl border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                          {...field}
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Create a strong password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 h-12 rounded-xl border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                          {...field}
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <button
                          type="button"
                          onClick={() => setShowPassword((show) => !show)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300 rounded-xl font-semibold text-base group"
                >
                  <div className="flex items-center gap-2">Create Account</div>
                </Button>
              </motion.div>
            </form>
          </Form>

          {/* Sign In Link */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline"
              >
                Sign in here
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Modal */}
      {modal?.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-muted min-w-[400px] max-w-[90vw] text-center animate-fadeIn">
            <div
              className={`mb-2 flex items-center justify-center ${
                modal.type === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {modal.type === "success" ? (
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#58dd91" opacity=".15" />
                  <path
                    stroke="#19bc65"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 13l3 3 7-7"
                  />
                </svg>
              ) : (
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#f87171" opacity=".15" />
                  <path
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9l-6 6m0-6l6 6"
                  />
                </svg>
              )}
            </div>
            <div className="text-lg font-medium mb-2">{modal.message}</div>
            <button
              onClick={() => {
                if (modal.type === "success" && userEmail) {
                  router.push(
                    `/verifyCode?email=${encodeURIComponent(userEmail)}`
                  );
                } else {
                  setModal(null);
                }
              }}
              className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg px-6 py-2 font-semibold shadow transition hover:scale-105 hover:brightness-105 active:scale-95"
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
