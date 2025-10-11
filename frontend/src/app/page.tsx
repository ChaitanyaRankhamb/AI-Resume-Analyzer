import FeatureSection from "@/components/feature-section";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/howItWorks";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";
import React from "react";
import VerificationForm from "@/components/verificationForm";

function page() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default page;
