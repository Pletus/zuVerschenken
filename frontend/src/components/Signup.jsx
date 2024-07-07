import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import "../components/CSS/Signup.css";

function Signup() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  const BASE_URL = "http://localhost:8080";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation on the client side
    if (!formValues.username || !formValues.email) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (formValues.password.length < 8 || formValues.password.length > 12) {
      toast.error("Password must be between 8 and 12 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      toast('Sign up successful')
      const data = await response.json();
      localStorage.setItem("token", data.token);
      const timer = setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginSignup flex justify-center min-h-screen pt-4">
      <form
        onSubmit={handleSubmit}
        className="mx-3 bg-blue-500 bg-opacity-30 loginSignupDiv2 flex flex-col justify-center text-center items-center align-middle gap-2"
      >
        <h2 className="text-4xl pb-4 text-blue-500 font-bold drop-shadow-xl">
          Sign up
        </h2>
        <div className="flex flex-col pt-6 gap-2">
          <input
            className="pl-2 inputWidth rounded-full bg-blue-500 bg-opacity-0 border-2 border-blue-400 text-black placeholder-gray-500 focus:outline-none focus:border-blue-600"
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            value={formValues.username}
            onChange={handleInput}
          />
          <br />
          <input
            className="pl-2 inputWidth rounded-full bg-blue-500 bg-opacity-0 border-2 border-blue-400 text-black placeholder-gray-500 focus:outline-none focus:border-blue-600"
            type="password"
            placeholder="Password (8-12 characters)"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInput}
          />
          <br />
          <input
            className="pl-2 inputWidth rounded-full bg-blue-500 bg-opacity-0 border-2 border-blue-400 text-black placeholder-gray-500 focus:outline-none focus:border-blue-600"
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInput}
          />
        </div>
        <div className="pt-10">
          <button
            className="loginButton flex justify-center items-center bg-blue-700 rounded-full text-white "
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up..." : "SIGN UP"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
}

export default Signup;
