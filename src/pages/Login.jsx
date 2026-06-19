import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import { API_URL } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const seo = useSeo("login", {
    title: "Login - Velvyana",
    description: "Login or create your Velvyana account.",
    keywords: "login, velvyana account, sign up",
  });

  const from = location.state?.from?.pathname || "/";

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      if (isSignup) {
        // 🔥 REGISTER API
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        // 🔥 AUTO LOGIN AFTER SIGNUP
        const loginRes = await login(email, password);

        if (!loginRes.success) throw new Error(loginRes.message);

      } else {
        // 🔥 LOGIN API
        const res = await login(email, password);

        if (!res.success) throw new Error(res.message);
      }

      // ✅ REDIRECT AFTER SUCCESS
      navigate(from, { replace: true });

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">

      <SeoHead {...seo} />

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow w-[350px]"
      >

        <h2 className="text-xl font-bold mb-4 text-white text-center">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        {isSignup && (
          <input
            placeholder="Name"
            className="w-full mb-3 p-2 bg-gray-800 text-white rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-gray-800 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-800 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="text-sm mt-4 text-center text-gray-400">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-pink-500 cursor-pointer"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;