// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { adminLogin } from "../api/authApi";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const doLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await adminLogin({ email, password }); // { token, admin? }
//       if (res?.token) {
//         login(res.token);
//         navigate("/", { replace: true }); // go to dashboard
//       } else {
//         alert("Invalid admin credentials");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Invalid admin credentials");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={doLogin}
//         className="bg-white p-8 rounded-xl shadow-xl w-96"
//       >
//         <h1 className="text-3xl font-semibold text-center mb-6">Admin Login</h1>

//         <input
//           type="email"
//           className="w-full border p-3 mb-3 rounded"
//           placeholder="Admin Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="w-full border p-3 mb-4 rounded"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-blue-600 text-white py-2 rounded text-lg">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { Lock, User } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const doLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await adminLogin({ email, password });
      if (res?.token) {
        login(res.token);
        navigate("/", { replace: true });
      } else {
        setErrorMsg("Invalid Credentials");
      }
    } catch {
      setErrorMsg("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center 
    bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4">

      <form
        onSubmit={doLogin}
        className="bg-white/90 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Dashboard
        </h1>

        {errorMsg && (
          <p className="bg-red-100 text-red-600 text-center p-2 rounded mb-3 text-sm">
            {errorMsg}
          </p>
        )}

        <label className="text-gray-700 text-sm font-medium">Email</label>
        <div className="flex items-center gap-2 border bg-gray-100 p-3 rounded mb-4">
          <User size={18} className="text-gray-500" />
          <input
            type="email"
            className="bg-transparent outline-none w-full text-gray-800"
            placeholder="admin@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label className="text-gray-700 text-sm font-medium">Password</label>
        <div className="flex items-center gap-2 border bg-gray-100 p-3 rounded mb-6">
          <Lock size={18} className="text-gray-500" />
          <input
            type="password"
            className="bg-transparent outline-none w-full text-gray-800"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-700 
          text-white font-semibold text-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
}
