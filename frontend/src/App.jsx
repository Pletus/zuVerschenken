import React from "react";
import { Route, Routes} from "react-router-dom";
import Cards from "./components/Cards";
import AddItem from "./components/AddItem";
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/items" element={<Cards />} />
      <Route path="/AddItem" element={<AddItem />}
      />
      </Routes>
    </div>
  );
};

export default App;
