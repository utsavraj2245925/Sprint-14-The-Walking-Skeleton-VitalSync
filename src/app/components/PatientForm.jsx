"use client";

import { useState, useEffect } from "react";

export default function PatientForm({
  onAddPatient,
  editingPatient,
}) {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {

    if (editingPatient) {

      setName(editingPatient.name);
      setAge(editingPatient.age);
      setDisease(editingPatient.disease);
      setStatus(editingPatient.status);

    }

  }, [editingPatient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    onAddPatient({
      name,
      age,
      disease,
      status,
    });

    setName("");
    setAge("");
    setDisease("");
    setStatus("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 text-black">

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingPatient ? "Edit Patient" : "Add Patient"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-4 gap-4"
      >

        <input
          type="text"
          placeholder="Patient Name"
          className="border-2 border-gray-400 text-black placeholder:text-gray-500 p-3 rounded bg-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          className="border-2 border-gray-400 text-black placeholder:text-gray-500 p-3 rounded bg-white"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Disease"
          className="border-2 border-gray-400 text-black placeholder:text-gray-500 p-3 rounded bg-white"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Status"
          className="border-2 border-gray-400 text-black placeholder:text-gray-500 p-3 rounded bg-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg col-span-full transition"
        >
          {editingPatient ? "Update Patient" : "Add Patient"}
        </button>

      </form>

    </div>
  );
}