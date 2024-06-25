import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import Login from "./components/Login";
import AddItem from "./components/AddItem";
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import "./App.css";
import "./index.css";
import OneItem from "./components/OneItem";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) setUser(true);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="/items/:id" element={<OneItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/additem"
            element={user ? <AddItem /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;