import React from "react";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Your React App
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Start building something amazing!
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
