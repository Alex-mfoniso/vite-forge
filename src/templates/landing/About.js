import React from "react";

function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're passionate about creating tools that help developers build
            better software. Our mission is to provide high-quality, easy-to-use
            solutions that empower developers to focus on what matters most:
            building great products.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">100+</h3>
              <p className="text-gray-600">Projects Built</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">50+</h3>
              <p className="text-gray-600">Happy Developers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">24/7</h3>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
