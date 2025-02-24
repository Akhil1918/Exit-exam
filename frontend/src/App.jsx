import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddFeedback from './pages/AddFeedback';
import UpdateFeedback from './pages/UpdateFeedback';

function App() {
  const [editFeedback, setEditFeedback] = useState(null);

  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/feedback" element={<AddFeedback />} />
      <Route path="/feedback/:id" element={<UpdateFeedback />} />
    </Routes>  
    </Router>
   
  )
}

export default App
