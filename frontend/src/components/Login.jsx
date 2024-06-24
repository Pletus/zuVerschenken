import { useState, useContext } from "react";
// import { AuthContext } from '../context/AuthContext';
import "../App.css";
import { NavLink } from "react-router-dom";

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
    <section className="loginSignup flex justify-center min-h-screen pt-32">
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
            className="loginButton flex justify-center items-center bg-blue-700 rounded-full text-white "
            type="submit"
            disabled={loading}
          >
            LOG IN
          </button>
        </div>
        <NavLink to='/signup'  className="text-md text-blue-500 drop-shadow-xl pt-1">don´t you have an account?</NavLink>
      </form>
    </section>
  );
}

export default Login;
