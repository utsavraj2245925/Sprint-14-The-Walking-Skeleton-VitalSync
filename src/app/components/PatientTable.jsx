"use client";

export default function PatientTable({
  patients,
  onDeletePatient,
  onEditPatient,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
        <h2 className="text-2xl font-bold text-gray-800">
          Patient Records
        </h2>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Total: {patients.length}
        </span>
      </div>

      {/* Mobile Swipe Hint */}
      <p className="text-sm text-gray-500 mb-3 md:hidden">
        ← Swipe horizontally to see full table →
      </p>

      {patients.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🏥</div>

          <h3 className="text-xl font-semibold text-gray-700">
            No Patients Found
          </h3>

          <p className="text-gray-500 mt-2">
            Add your first patient to start managing records.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[800px] bg-white text-black">
            <thead>
              <tr className="bg-gray-100 text-gray-900">
                <th className="p-4 text-left font-semibold border-b">
                  Name
                </th>

                <th className="p-4 text-left font-semibold border-b">
                  Age
                </th>

                <th className="p-4 text-left font-semibold border-b">
                  Disease
                </th>

                <th className="p-4 text-left font-semibold border-b">
                  Status
                </th>

                <th className="p-4 text-center font-semibold border-b">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

            {patients.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-8 text-gray-500"
                >
                  <div className="flex flex-col items-center">

                    <h3 className="text-xl font-semibold">
                      No Patients Found
                    </h3>

                    <p className="mt-2">
                      Add your first patient using the form above.
                    </p>

                  </div>
                </td>

              </tr>

            ) : (

              patients.map((patient) => (

                <tr
                  key={patient.id}
                  className="hover:bg-gray-50"
                >

                  <td className="border p-3 text-black">
                    {patient.name}
                  </td>

                  <td className="border p-3 text-black">
                    {patient.age}
                  </td>

                  <td className="border p-3 text-black">
                    {patient.disease}
                  </td>

                  <td className="border p-3 text-black">
                    {patient.status}
                  </td>

                  <td className="border p-3">

                    <button
                      onClick={() => onEditPatient(patient)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        const confirmDelete =
                        window.confirm(
                          "Are you sure you want to delete this patient?"
                        );

                        if (confirmDelete) {
                          onDeletePatient(patient.id);
                        }
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>
          </table>
        </div>
      )}
    </div>
  );
}