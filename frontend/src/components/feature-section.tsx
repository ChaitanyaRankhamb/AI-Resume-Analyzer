// src/app/components/FeatureSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Sparkles,
  FileText,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";
import React from "react";

const features = [
  {
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning algorithms analyze your resume structure, content quality, and keyword optimization in real-time.",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    bgColor:
      "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    stats: "99.9% Accuracy",
    delay: 0,
  },
  {
    title: "Skills Assessment",
    description:
      "Comprehensive evaluation of your technical and soft skills with detailed insights and improvement recommendations.",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
    bgColor:
      "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    stats: "50+ Skills Tracked",
    delay: 0.2,
  },
  {
    title: "Format Compatibility",
    description:
      "Supports PDF, DOCX, and DOC files with advanced OCR for scanned documents and image-based resumes.",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    bgColor:
      "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
    stats: "All Formats",
    delay: 0.3,
  },
  {
    title: "Privacy & Security",
    description:
      "Enterprise-grade security with end-to-end encryption. Your data is never stored permanently on our servers.",
    icon: Shield,
    color: "from-indigo-500 to-purple-500",
    bgColor:
      "from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20",
    stats: "100% Secure",
    delay: 0.4,
  },
  {
    title: "Instant Results",
    description:
      "Get comprehensive analysis results in under 2 minutes with detailed reports and actionable recommendations.",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    bgColor:
      "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
    stats: "< 2 Minutes",
    delay: 0.5,
  },
];

const FeatureSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="features" className="relative py-24 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 border border-primary/10 rotate-45"
          animate={{ rotate: [45, 405], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-8 h-20 bg-gradient-to-b from-primary/10 to-transparent"
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-primary/2 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-primary/3 to-primary/1 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Premium Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Advanced Features</span>
          </motion.div>

          <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Powerful Tools for
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Career Success
            </span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Discover cutting-edge AI technology that transforms your resume into
            a powerful career tool. Get insights that matter, optimize for
            success, and land your dream job faster.
          </motion.p>
        </motion.div>

        {/* Premium Feature Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: feature.delay,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Premium Card */}
              <div className="relative bg-gradient-to-br from-card/80 via-card/70 to-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden h-full">
                {/* Removed the background color change on hover */}
                
                {/* Floating Icon */}
                <motion.div
                  className="relative mb-6"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: feature.delay * 2,
                  }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  /> */}
                </motion.div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: feature.delay + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{feature.stats}</span>
                  </motion.div>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
