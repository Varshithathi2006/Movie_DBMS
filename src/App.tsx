import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import MovieDetail from './pages/MovieDetail';
import PersonDetail from './pages/PersonDetail';
import UserProfile from './pages/UserProfile';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import Chatbot from './components/Chatbot';
import { UserProvider } from './context/UserContext';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Header />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/person/:id" element={<PersonDetail />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Chatbot />
          </div>
        </Router>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;