"use client";

import PatientForm from "../components/PatientForm";
import PatientTable from "../components/PatientTable";
import PatientChart from "../components/PatientChart";
import PatientAISummary from "../components/PatientAISummary";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPatient, setEditingPatient] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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

        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const fetchPatients = async () => {
    if (!user) return;

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

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  const handleAddPatient = async (patientData) => {
    if (editingPatient) {
  const { error } = await supabase
    .from("patients")
    .update({
      name: patientData.name,
      age: patientData.age,
      disease: patientData.disease,
      status: patientData.status,
    })
    .eq("id", editingPatient.id);

  if (error) {
    toast.error(error.message);
    return;
  }

 toast.success("Patient Updated Successfully ✅");

  setEditingPatient(null);

  await fetchPatients();

  return;
}

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

    setPatients((prev) => [...prev, ...data]);

   toast.success("Patient Added Successfully ✅");
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

  // Exit edit mode if deleted or currently editing
  setEditingPatient(null);

 toast.success("Patient Deleted Successfully ✅");

  fetchPatients();
};

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl font-semibold text-blue-600">
        Loading Patients...
      </div>
    </div>
  );
}

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-blue-700 text-white p-6 min-h-screen shadow-xl">
        <h1 className="text-3xl font-bold mb-10">VitalSync</h1>

        <nav className="space-y-3">
          <div className="bg-blue-500 p-4 rounded-xl font-medium">
            Dashboard
          </div>

          <div className="hover:bg-blue-500 transition-all p-4 rounded-xl cursor-pointer">
            Appointments
          </div>

          <div className="hover:bg-blue-500 transition-all p-4 rounded-xl cursor-pointer">
            Patients
          </div>

          <div className="hover:bg-blue-500 transition-all p-4 rounded-xl cursor-pointer">
            Prescriptions
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <aside className="lg:hidden w-full bg-blue-700 text-white p-4 mb-4 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6">VitalSync</h1>

          <nav className="space-y-3">
            <div className="bg-blue-500 p-3 rounded-lg">
              Dashboard
            </div>

            <div className="hover:bg-blue-500 p-3 rounded-lg cursor-pointer">
              Appointments
            </div>

            <div className="hover:bg-blue-500 p-3 rounded-lg cursor-pointer">
              Patients
            </div>

            <div className="hover:bg-blue-500 p-3 rounded-lg cursor-pointer">
              Prescriptions
            </div>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <section className="flex-1 p-3 sm:p-6 lg:p-10">
        {/* Single Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden mb-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          {mobileMenuOpen ? "Close Menu" : "Menu"}
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Welcome to VitalSync
            </h2>

            <p className="text-gray-500 mt-2">
              Healthcare Management Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition-all text-white px-5 py-3 rounded-lg shadow"
          >
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-gray-500 font-medium">
              Total Patients
            </h3>

            <p className="text-4xl font-bold text-gray-900 mt-3">
              {patients.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-gray-500 font-medium">
              Doctors Available
            </h3>

            <p className="text-4xl font-bold text-gray-900 mt-3">
              18
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-gray-500 font-medium">
              Appointments Today
            </h3>

            <p className="text-4xl font-bold text-gray-900 mt-3">
              52
            </p>
          </div>
        </div>

        {/* Add Patient Form */}
        <PatientForm
          onAddPatient={handleAddPatient}
          editingPatient={editingPatient}
        />

        {/* Patient Records */}
        <PatientTable
          patients={patients}
          onDeletePatient={handleDeletePatient}
          onEditPatient={handleEditPatient}
        />

        {/* Analytics */}
        <div className="w-full mt-8">
          <PatientChart patients={patients} />
        </div>

        <PatientAISummary />

        {/* User Information */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Logged In User
          </h3>

          {user && (
            <div className="space-y-4 break-all">
              <p className="text-gray-700">
                <span className="font-bold">
                  Email:
                </span>{" "}
                {user.email}
              </p>

              <p className="text-gray-700">
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