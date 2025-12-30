import React from "react";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: "📊", active: true },
    { name: "Users", icon: "👥", active: false },
    { name: "Products", icon: "📦", active: false },
    { name: "Orders", icon: "📋", active: false },
    { name: "Analytics", icon: "📈", active: false },
    { name: "Settings", icon: "⚙️", active: false },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={`flex items-center px-6 py-3 text-sm font-medium rounded-lg mx-2 transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
