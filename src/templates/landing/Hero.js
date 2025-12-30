import React from "react";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Build Something Amazing
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create stunning web applications with modern tools and best practices.
          Start your project today and bring your ideas to life.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
