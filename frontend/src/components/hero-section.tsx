// src/app/components/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileText,
  Brain,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Target,
  Star,
} from "lucide-react";
import React from "react";

const HeroSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating Premium Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Premium Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/6 via-primary/3 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-primary/5 to-primary/2 rounded-full blur-3xl"
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 right-32 w-8 h-8 border border-primary/20 rotate-45"
          animate={{ rotate: [45, 405], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-6 h-6 bg-primary/10 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-16 w-4 h-12 bg-gradient-to-b from-primary/20 to-transparent"
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-20 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-center relative z-10">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          {/* Premium Badge */}
          <motion.div
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span>AI-Powered Resume Analysis</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 to-transparent blur-sm" />
          </motion.div>

          {/* Premium Main Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.span
              className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform Your
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent block relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Resume with AI
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </motion.span>
          </motion.h1>

          {/* Premium Subheading */}
          <motion.p
            className="text-muted-foreground text-lg sm:text-xl lg:text-2xl mb-10 max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Get instant insights, optimize keywords, and enhance your resume
            with{" "}
            <span className="font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              advanced AI analysis
            </span>
            . Land more interviews with data-driven improvements.
          </motion.p>

          {/* Premium Feature Highlights */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 "
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              {
                icon: Brain,
                text: "AI Analysis",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: TrendingUp,
                text: "Keyword Optimization",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Zap,
                text: "Instant Results",
                color: "from-yellow-500 to-orange-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-card/50 to-card/30 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300
                max-sm:py-2"
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg max-sm:w-6 max-sm:h-6`}
                >
                  <feature.icon className="w-4 h-4 text-white max-sm:w-3 max-sm:h-3" />
                </div>
                <span className="text-sm max-sm:text-[12px] font-medium text-foreground group-hover:text-primary transition-colors ">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            className="flex justify-center lg:justify-start gap-6 flex-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 group overflow-hidden
                max-sm:py-4 max-sm:px-5"
              >
                <span className="relative z-10 flex items-center gap-2 max-sm:text-sm">
                  Start Analyzing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform max-sm:w-3 max-sm:h-3" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="relative border-2 border-border/60 text-foreground px-10 py-6 text-lg font-semibold hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-300 backdrop-blur-sm max-sm:py-4 max-sm:px-5"
              >
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  View Demo
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Premium Hero Visual */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 flex justify-center mt-12 lg:mt-24">
          <motion.div
            className="relative w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            {/* Premium Main Card */}
            <motion.div
              className="relative bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-xl border border-border/50 rounded-3xl p-8 "
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ y }}
            >
              {/* Premium Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md">
                    <FileText className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl blur-sm -z-10" />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">
                    AI Resume Analysis
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Processing in real-time
                  </div>
                </div>
              </div>

              {/* Premium Progress Bars */}
              <div className="space-y-6 mb-8">
                {[
                  {
                    label: "Keyword Analysis",
                    progress: 85,
                    delay: 0,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "Skills Extraction",
                    progress: 92,
                    delay: 0.5,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    label: "Optimization",
                    progress: 78,
                    delay: 1,
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((item) => (
                  <motion.div key={item.label} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="relative w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{
                          delay: 1.5 + item.delay,
                          duration: 2,
                          ease: "easeOut",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Premium Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-6 h-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 w-6 h-16 bg-gradient-to-b from-primary/20 to-primary/10 rounded-full"
                animate={{ scaleY: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </motion.div>

            {/* Premium Background Effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/8 to-primary/15 rounded-3xl blur-2xl -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-xl -z-20"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
