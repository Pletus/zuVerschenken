import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Wishlist from "./components/Wishlist";
import Login from "./components/Login";
import NotYourProfile from "./components/NotYourProfile";
import AddItem from "./components/AddItem";
import Items from "./components/Items";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import OneItem from "./components/OneItem";
import About from "./components/About";
import Contact from "./components/Contact";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) setUser(true);
  }, []);

  return (
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
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/items" element={<Items />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users/:id" element={<NotYourProfile />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;