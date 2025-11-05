import { useContext, useState } from "react";
import { adminLogin } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin({ email, password });
      login(res.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={doLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h1 className="text-3xl font-semibold text-center mb-6">Admin Login</h1>

        <input
          type="email"
          className="w-full border p-3 mb-3 rounded"
          placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded text-lg">
          Login
        </button>
      </form>
    </div>
  );
}
