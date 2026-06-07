"use client";
import PatientForm from "../components/PatientForm";
import PatientTable from "../components/PatientTable";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
const router = useRouter();
const [patients, setPatients] = useState([]);
const [editingPatient, setEditingPatient] = useState(null);
const { user, setUser, clearUser } = useAuthStore();

useEffect(() => {
  const getUser = async () => {
    const {  data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
    } else {

      setUser(user);

      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (!error) {
        setPatients(data);
      }

    }
  };

  getUser();

}, [router]);

const fetchPatients = async () => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (!error) {
    setPatients(data);
  }
};

useEffect(() => {
  if (user) {
    fetchPatients();
  }
}, [user]);

const handleAddPatient = async (patientData) => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("patients")
    .insert([
      {
        ...patientData,
        user_id: user.id,
      },
    ])
    .select();

  if (error) {
    alert(error.message);
    return;
  }

  setPatients((prev) => [
    ...prev,
    ...data,
  ]);

  alert("Patient Added Successfully ✅");
};

const handleLogout = async () => {

  await supabase.auth.signOut();
  clearUser();
  router.push("/login");
};

const handleDeletePatient = async (id) => {
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Patient Deleted Successfully ✅");

  fetchPatients();

};

  return (
    <main className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6">
        <h1 className="text-3xl font-bold mb-10">
          VitalSync
        </h1>

        <nav className="space-y-4">
          <div className="bg-blue-500 p-3 rounded">
            Dashboard
          </div>

          <div className="hover:bg-blue-500 p-3 rounded cursor-pointer">
            Appointments
          </div>

          <div className="hover:bg-blue-500 p-3 rounded cursor-pointer">
            Patients
          </div>

          <div className="hover:bg-blue-500 p-3 rounded cursor-pointer">
            Prescriptions
          </div>

        </nav>

      </aside>

      {/* Main Content */}

      <section className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome to VitalSync
            </h2>

            <p className="text-gray-500 mt-2">
              Healthcare Management Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow text-gray-800">
            <h3 className="text-gray-700 font-medium">
              Total Patients
            </h3>

            <p className="text-4xl font-bold mt-3">
              245
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-gray-800">
            <h3 className="text-gray-700 font-medium">
              Doctors Available
            </h3>

            <p className="text-4xl font-bold mt-3 text-gray-900">
              18
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-gray-800">
            <h3 className="text-gray-700 font-medium">
              Appointments Today
            </h3>

            <p className="text-4xl font-bold mt-3 text-gray-900">
              52
            </p>
          </div>

        </div>

        <PatientForm
          onAddPatient={handleAddPatient}
        />

        <PatientTable
          patients={patients}
          onDeletePatient={handleDeletePatient}
        />

        {/* User Info */}

        <div className="bg-white p-8 rounded-xl shadow text-gray-800">

          <h3 className="text-2xl font-bold mb-6">
            Logged In User
          </h3>

          {user && (
            <div className="space-y-4">

              <p>
                <span className="font-bold">
                  Email:
                </span>{" "}
                {user.email}
              </p>

              <p>
                <span className="font-bold">
                  User ID:
                </span>{" "}
                {user.id}
              </p>

            </div>
          )}

        </div>

      </section>

    </main>
  );
}



