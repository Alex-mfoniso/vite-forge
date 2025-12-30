import React from "react";
import StatCard from "../components/StatCard.jsx";
import RecentActivity from "../components/RecentActivity.jsx";

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="2,543" change="+12%" />
        <StatCard title="Revenue" value="$45,231" change="+8%" />
        <StatCard title="Orders" value="1,234" change="+23%" />
        <StatCard title="Conversion" value="3.2%" change="-2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Add New User
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Generate Report
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}

export default Dashboard;
