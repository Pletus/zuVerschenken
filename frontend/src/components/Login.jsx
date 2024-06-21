import { useState, useContext } from "react";
// import { AuthContext } from '../context/AuthContext';

import "../App.css";

function Login() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [user, setUser] = useState(false);
  const BASE_URL = "http://localhost:8080";

  //   const { BASE_URL, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-wrap justify-center text-center align-middle p-12 px-28 gap-2 opacity-100"
    >
      <h2 className="text-4xl pb-6 font-bold drop-shadow-xl text-amber-500">
        Log in
      </h2>
      <label
        className="font-bold drop-shadow-xl text-amber-400"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="rounded-lg opacity-70 rounded-full border-2 border-violet-900"
        type="text"
        name="username"
        id="username"
        value={formValues.username}
        onChange={handleInput}
      />
      <br />
      <label
        className="font-bold drop-shadow-xl text-amber-400"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="rounded-lg opacity-70 rounded-full border-2 border-violet-900"
        type="password"
        name="password"
        id="password"
        value={formValues.password}
        onChange={handleInput}
      />{" "}
      <br />
      <label
        className="text-amber-600 font-bold drop-shadow-xl text-amber-400"
        htmlFor="email"
      >
        E-mail
      </label>
      <input
        className="rounded-lg opacity-70 rounded-full border-2 border-violet-900"
        type="email"
        name="email"
        id="email"
        value={formValues.email}
        onChange={handleInput}
      />{" "}
      <br />
      <div className="flex justify-center">
        <button
          className="flex rounded-lg bg-cyan-500 p-1 px-4 font-bold drop-shadow-xl text-rose-700"
          type="submit"
          disabled={loading}
        >
          Log in
        </button>
      </div>
    </form>
  );
}

export default Login;
