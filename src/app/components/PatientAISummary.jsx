"use client";

import { useState } from "react";

export default function PatientAISummary() {
  const [patientInfo, setPatientInfo] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientInfo,
        }),
      });

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("Response:", data);

      if (!response.ok) {
        setSummary(
          "AI service temporarily unavailable. Patient requires monitoring and continued treatment."
        );
        return;
      }

      setSummary(data.summary);
    } catch (error) {
      console.log("Error:", error);

      setSummary(
        "AI service temporarily unavailable. Patient requires monitoring and continued treatment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        AI Patient Summary
      </h2>

      <textarea
        value={patientInfo}
        onChange={(e) => setPatientInfo(e.target.value)}
        placeholder="Enter patient details..."
        className="w-full border p-3 rounded text-black"
        rows={5}
      />

      <button
        onClick={generateSummary}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mt-4"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-black whitespace-pre-line">
          {summary}
        </div>
      )}
    </div>
  );
}