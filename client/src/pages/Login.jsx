import { useState } from "react";
import { loginApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await loginApi(form);

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      // Redirect based on role
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "CAREGIVER") navigate("/caregiver/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-sm text-gray-600 text-center mt-1">
            Login to book elderly care services
          </p>

          {error && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
