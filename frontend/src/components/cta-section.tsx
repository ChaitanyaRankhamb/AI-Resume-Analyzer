"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Star,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section id="contact" className="relative py-24 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Premium Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Premium Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-primary/6 via-primary/3 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 right-32 w-10 h-10 border border-primary/20 rotate-45"
          animate={{ rotate: [45, 405], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-8 h-8 bg-primary/10 rounded-full"
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-16 w-6 h-14 bg-gradient-to-b from-primary/20 to-transparent"
          animate={{ y: [0, -25, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Premium CTA Content */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ y }}
        >
          {/* Premium Badge */}
          <motion.div
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span>Start Your Journey</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 to-transparent blur-sm" />
          </motion.div>

          {/* Premium Main Heading */}
          <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Ready to Land Your
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent block relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Dream Job?
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
                viewport={{ once: true }}
              />
            </motion.span>
          </motion.h2>

          {/* Premium Subheading */}
          <motion.p
            className="text-muted-foreground text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join thousands of professionals who have transformed their careers
            with our
            <span className="font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {" "}
              AI-powered resume analysis
            </span>
            . Get started today and unlock your potential.
          </motion.p>

          {/* Premium Stats */}
          <motion.div
            className="flex justify-center gap-12 mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: "50K+", label: "Resumes Optimized", icon: Target },
              { number: "95%", label: "Success Rate", icon: TrendingUp },
              { number: "2min", label: "Average Time", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Upload className="w-6 h-6" />
                  Upload Resume Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="relative border-2 border-border/60 text-foreground px-12 py-6 text-lg font-semibold hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3">
                  <Star className="w-5 h-5" />
                  Get Started Free
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Premium Trust Indicators */}
          <motion.div
            className="flex justify-center items-center gap-8 mt-16 pt-8 border-t border-border/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {["100% Secure", "No Credit Card Required", "Instant Results"].map(
              (indicator, index) => (
                <motion.div
                  key={indicator}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary/70" />
                  <span>{indicator}</span>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
