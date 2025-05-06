import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EventDetails from './pages/EventDetails';
import Login from './components/Login';
import Register from './components/Register';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent'; // 🔸 dodane

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profil" element={<Profile />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/dodaj" element={<AddEvent />} />
                <Route path="/edytuj/:id" element={<EditEvent />} /> {/* 🔸 nowa trasa */}
            </Routes>
        </Router>
    );
}

export default App;
