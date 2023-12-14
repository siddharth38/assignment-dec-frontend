import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useState } from "react"
import Home from './Component/Home';
import Edit from './Component/Edit';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/edit/:id' element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
