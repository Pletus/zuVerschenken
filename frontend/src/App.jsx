/* import { useState } from "react";
import "./App.css";
import AddItem from "./components/AddItem";

function App() {
  return (
    <div className="container mx-auto p-4">
      <Route path="/products" component={ProductsPage} />
    <AddItem />
  </div>
  );
}

export default App; */

import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Cards from './components/Cards';
import AddItem from './components/AddItem';
import "./App.css";

const App = () => {
  return (
    <div>
      <Cards />
    </div>
  );
};

export default App;

