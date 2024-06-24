import { useState, useEffect } from 'react';
import Login from './components/Login';
import './App.css'
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

export default App
