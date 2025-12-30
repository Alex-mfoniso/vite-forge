import React from "react";

function RecentActivity() {
  const activities = [
    { user: "John Doe", action: "created a new order", time: "2 minutes ago" },
    { user: "Jane Smith", action: "updated profile", time: "5 minutes ago" },
    {
      user: "Bob Johnson",
      action: "added new product",
      time: "10 minutes ago",
    },
    { user: "Alice Brown", action: "logged in", time: "15 minutes ago" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
