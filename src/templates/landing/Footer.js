import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Status
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
