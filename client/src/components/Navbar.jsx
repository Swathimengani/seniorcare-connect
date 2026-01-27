import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-blue-600">
          SeniorCare Connect
        </Link>

        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link className="px-3 py-2 rounded hover:bg-gray-100" to="/login">
                Login
              </Link>
              <Link
                className="px-3 py-2 rounded bg-black text-white hover:opacity-90"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                {user?.name} ({user?.role})
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded bg-red-500 text-white hover:opacity-90"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
