"use client";

import React, { useRef } from "react";
import Hero from "./_components/Hero";
import Overview from "./_components/Overview";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import NavBar from "./_components/NavBar";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null); // Create a ref for the Overview section
  const featuresRef = useRef<HTMLDivElement>(null); // Create a ref for the Features section

  return (
    <main>
      <NavBar
        heroRef={heroRef}
        overviewRef={overviewRef}
        featuresRef={featuresRef}
      />

      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={overviewRef}>
        <Overview />
      </div>
      <div ref={featuresRef}>
        <Features />
      </div>
      <Footer />
    </main>
  );
}
