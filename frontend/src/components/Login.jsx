import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/CSS/Login.css"

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      toast('login successful')
      const data = await response.json();
      localStorage.setItem("token", data.token);
      const timer = setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginSignup flex justify-center min-h-screen pt-4">
      <form
        onSubmit={handleSubmit}
        className="mx-3 bg-blue-500 bg-opacity-30 loginSignupDiv1 flex flex-col flex-wrap justify-center text-center items-center align-middle gap-2"
      >
        <h2 className="text-4xl pb-4 text-blue-500 font-bold drop-shadow-xl">
          Log in
        </h2>
        <div className="flex flex-col pt-4">
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
            placeholder="Password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInput}
          />
        </div>
        <div className="pt-5">
          <button
            className="loginButton flex justify-center items-center bg-blue-700 rounded-full text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </div>
        <NavLink
          to="/signup"
          className="text-md text-blue-500 drop-shadow-xl pt-1"
        >
          you don´t have an account yet?
        </NavLink>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Login;
