import React from "react";
import Hero from "./_components/Hero";
import Overview from "./_components/Overview";
export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Overview />

      <section className="bg-slate-200">
        <div className="py-14">
          <h2 className="text-4xl font-bold text-center mb-6">Features</h2>
          <div className="container flex items-center justify-center gap-12 ">
            <div>
              <h3>Feature 1</h3>
            </div>

            <div>
              <h3>Feature 2</h3>
            </div>

            <div>
              <h3>Feature 3</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
