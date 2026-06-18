import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="text-center max-w-xl">

        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">
          VitalSync
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Smart Healthcare Dashboard with AI Powered Patient Insights
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </Link>

        </div>

        <p className="mt-8 text-gray-500">
          Already have an account? Click Login.
        </p>

      </div>
    </main>
  );
}