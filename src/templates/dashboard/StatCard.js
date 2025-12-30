import React from "react";

function StatCard({ title, value, change }) {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
