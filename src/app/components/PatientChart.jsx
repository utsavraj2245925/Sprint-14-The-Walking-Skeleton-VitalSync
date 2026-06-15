"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function PatientChart({ patients }) {
  const recoveredCount = patients.filter(
    (p) => p.status === "Recovered"
  ).length;

  const criticalCount = patients.filter(
    (p) => p.status === "Critical"
  ).length;

  const treatmentCount = patients.filter(
    (p) => p.status === "Under Treatment"
  ).length;

  const chartData = [
    {
      name: "Recovered",
      count: recoveredCount,
    },
    {
      name: "Critical",
      count: criticalCount,
    },
    {
      name: "Under Treatment",
      count: treatmentCount,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-6 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Patient Analytics
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Overview of patient status distribution
          </p>
        </div>

        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          Total Patients: {patients.length}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full p-2 sm:p-6">
        <div className="h-[350px] sm:h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />

              <Legend />

              <Bar
                dataKey="count"
                name="Patients"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
                maxBarSize={80}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 border-t border-gray-100 bg-gray-50">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <h3 className="text-green-700 font-semibold">
            Recovered
          </h3>

          <p className="text-3xl font-bold text-green-800 mt-2">
            {recoveredCount}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 text-center">
          <h3 className="text-red-700 font-semibold">
            Critical
          </h3>

          <p className="text-3xl font-bold text-red-800 mt-2">
            {criticalCount}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <h3 className="text-yellow-700 font-semibold">
            Under Treatment
          </h3>

          <p className="text-3xl font-bold text-yellow-800 mt-2">
            {treatmentCount}
          </p>
        </div>
      </div>
    </div>
  );
}