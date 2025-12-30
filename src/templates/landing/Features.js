import React from "react";

function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Fast Performance",
      description:
        "Built with modern technologies for lightning-fast load times and smooth user experience.",
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description:
        "Clean, responsive design that looks great on all devices and screen sizes.",
    },
    {
      icon: "🔧",
      title: "Easy to Use",
      description:
        "Intuitive interface and comprehensive documentation to get you started quickly.",
    },
    {
      icon: "🔒",
      title: "Secure",
      description:
        "Built with security best practices to keep your data safe and protected.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to build modern web applications
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
