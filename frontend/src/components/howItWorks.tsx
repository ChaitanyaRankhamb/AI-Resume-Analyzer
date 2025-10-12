"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Upload,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Zap,
  Target,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Upload,
    title: "Upload Your Resume",
    description:
      "Easily upload your resume in PDF, DOCX, or DOC format with advanced OCR support for scanned documents. Your files are processed securely and instantly.",
    color: "from-blue-500 to-cyan-500",
    bgColor:
      "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    stats: "All Formats",
    delay: 0,
    features: ["PDF Support", "OCR Technology", "Secure Upload"],
  },
  {
    id: 2,
    icon: Brain,
    title: "AI Analyzes Content",
    description:
      "Our advanced machine learning engine deeply scans your resume to extract key skills, experiences, achievements, and identify optimization opportunities.",
    color: "from-purple-500 to-pink-500",
    bgColor:
      "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    stats: "99.9% Accuracy",
    delay: 0.1,
    features: ["ML Analysis", "Skill Extraction", "Gap Detection"],
  },
  {
    id: 3,
    icon: Sparkles,
    title: "Get Actionable Insights",
    description:
      "Receive a comprehensive personalized breakdown with specific recommendations to enhance your resume and significantly boost your interview chances.",
    color: "from-green-500 to-emerald-500",
    bgColor:
      "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
    stats: "40% More Matches",
    delay: 0.2,
    features: ["Keyword Optimization", "ATS Scoring", "Interview Tips"],
  },
];

const HowItWorks: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="how-it-works"
      className="relative py-24 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-muted/20 via-background to-background overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-20 h-20 border border-primary/10 rotate-45"
          animate={{ rotate: [45, 405], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 left-32 w-16 h-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        {/* <motion.div
          className="absolute bottom-40 right-1/4 w-12 h-24 bg-gradient-to-b from-primary/10 to-transparent"
          animate={{ y: [0, -25, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        /> */}

        {/* Gradient Orbs */}
        {/* <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/4 to-primary/1 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-primary/3 to-primary/1 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        /> */}

        {/* Connecting Lines */}
        {/* <motion.div
          className="absolute top-1/2 left-1/3 w-1 h-32 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
          animate={{ scaleY: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-1 h-32 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
          animate={{ scaleY: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        /> */}
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
            <Zap className="w-4 h-4" />
            <span>Simple Process</span>
          </motion.div>

        <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              How It
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Works
            </span>
        </motion.h2>

        <motion.p
            className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
        >
            Transform your resume into an AI-powered career roadmap in three
            simple, powerful steps. Our advanced technology makes resume
            optimization effortless and effective.
        </motion.p>
        </motion.div>

        {/* Premium Steps Grid */}
        <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: step.delay,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group relative"
              style={{ y }}
            >
              {/* Step Number Badge */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg z-20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: step.delay + 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                {step.id}
              </motion.div>

              {/* Premium Card */}
              <div className="relative bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden h-full">
                {/* Background Gradient */}
                {/* <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                /> */}

                {/* Floating Icon */}
                <motion.div
                  className="relative mb-8 flex justify-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: step.delay * 2,
                  }}
                >
                  <div
                    className={`w-20 h-20 max-md:w-10 max-md:h-10 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative`}
                  >
                    <step.icon className="w-10 h-10 text-white max-sm:w-4 max-sm:h-4" />

                    {/* Icon Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Stats Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: step.delay + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Target className="w-3 h-3" />
                    <span>{step.stats}</span>
                  </motion.div>

                  {/* Feature List */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: step.delay + 0.7 + featureIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary/70 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  initial={{ x: "-100%" }}
                />

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

              {/* Connecting Arrow (Desktop Only) */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: step.delay + 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
