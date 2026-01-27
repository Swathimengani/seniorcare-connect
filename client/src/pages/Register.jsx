import { useState } from "react";
import { registerApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await registerApi(form);

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      // Redirect based on role
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "CAREGIVER") navigate("/caregiver/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <p className="text-sm text-gray-600 text-center mt-1">
            Join SeniorCare Connect
          </p>

          {error && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Create password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Register As</label>
              <select
                className="w-full mt-1 p-2 border rounded-lg"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="USER">User (Family)</option>
                <option value="CAREGIVER">Caregiver</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
