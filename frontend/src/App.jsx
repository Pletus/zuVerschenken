import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Cards from "./components/Cards";
import Login from './components/Login';
import AddItem from "./components/AddItem";
import Signup from './components/Signup';
import "./App.css";
import './index.css'

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





