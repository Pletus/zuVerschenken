import './index.css'
import Hero from './components/Hero'
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Cards from "./components/Cards";
import { useState, useEffect } from "react";;
import Login from './components/Login';
import "./App.css";
import AddItem from "./components/AddItem";
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) setUser(true);
  }, []);

  return (
    <>

    </>
  )
}

export default App;





