"use client";

export default function PatientTable({
  patients,
  onDeletePatient,
  onEditPatient,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8 border border-gray-200">

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Patient Records
      </h2>

      <table className="w-full border text-black bg-white">

        <thead>

          <tr className="bg-gray-100 text-gray-900">

            <th className="border p-3 bg-gray-100 text-black font-semibold">
              Name
            </th>

            <th className="border p-3 bg-gray-100 text-black font-semibold">
              Age
            </th>

            <th className="border p-3 bg-gray-100 text-black font-semibold">
              Disease
            </th>

            <th className="border p-3 bg-gray-100 text-black font-semibold">
              Status
            </th>
            <th className="border p-3 bg-gray-100 text-black font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {patients.map((patient) => (

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

          ))}

        </tbody>

      </table>

    </div>
  );
}


