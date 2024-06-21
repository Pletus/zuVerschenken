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
  const navigate = useNavigate();

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
      navigate("/posts");
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <img src="..\assets\images\vecteezy_volunteers-packing-donation-boxes_6901865.jpg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-wrap justify-center text-center align-middle bg-blue w-32 gap-2 opacity-100"
      >
        <h2 className="text-4xl pb-6 font-bold drop-shadow-xl text-amber-500">
          Sign up
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
            Sign up
          </button>
        </div>
      </form>
    </img>
  );
}

export default Signup;
