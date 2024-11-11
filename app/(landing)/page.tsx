"use client";

import React, { useRef, useState } from "react";
import Hero from "./_components/Hero";
import Overview from "./_components/Overview";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import NavBar from "./_components/NavBar";
import LoginForm from "./_components/LoginForm";

export default function LandingPage() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null); // Create a ref for the Overview section
  const featuresRef = useRef<HTMLDivElement>(null); // Create a ref for the Features section

  const showLoginForm = () => setIsLoginFormVisible(true);
  const hideLoginForm = () => setIsLoginFormVisible(false);

  return (
    <main>
      <NavBar
        heroRef={heroRef}
        overviewRef={overviewRef}
        featuresRef={featuresRef}
        onLoginClick={showLoginForm}
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

      {isLoginFormVisible && <LoginForm onClose={hideLoginForm}/>}
    </main>
  );
}
