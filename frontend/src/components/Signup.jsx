import { useState, useContext } from "react";
// import { AuthContext } from '../context/AuthContext';

import "../App.css";

function Signup() {
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
      const response = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(true);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginSignup flex justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="mx-3 bg-blue-500 bg-opacity-30 loginSignupDiv2 flex flex-col flex-wrap justify-center text-center items-center align-middle gap-2"
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
            placeholder="Password"
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
            SIGN UP
          </button>
        </div>
      </form>
    </section>
  );
}

export default Signup;
