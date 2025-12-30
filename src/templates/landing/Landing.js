import React from "react";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";

function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
}

export default Landing;
