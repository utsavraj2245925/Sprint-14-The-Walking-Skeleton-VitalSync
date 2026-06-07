"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PatientChart({ patients }) {

  const chartData = [
    {
      name: "Recovered",
      count: patients.filter(
        (p) => p.status === "Recovered"
      ).length,
    },
    {
      name: "Critical",
      count: patients.filter(
        (p) => p.status === "Critical"
      ).length,
    },
    {
      name: "Under Treatment",
      count: patients.filter(
        (p) => p.status === "Under Treatment"
      ).length,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Patient Analytics
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={chartData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}