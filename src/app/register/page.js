"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration Successful ✅");

    router.push("/login");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {loading ? "Loading..." : "Create Account"}
        </button>

      </form>

    </main>
  );
}