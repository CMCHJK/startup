import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { Checkin } from './checkin/checkin';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';

export default function App() {
  const [userName, setUserName] = useState('');

  async function refreshAuth() {
    try {
      const response = await fetch('/api/auth/me');

      if (!response.ok) {
        setUserName('');
        return;
      }

      const data = await response.json();
      setUserName(data.email || '');
    } catch {
      setUserName('');
    }
  }

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <h1>Health Score</h1>

          <div>
            Current User: {userName || 'Not logged in'}
          </div>

          <nav>
            <NavLink to="">Home</NavLink>
            <NavLink to="login">Login</NavLink>
            {userName && <NavLink to="checkin">Check-in</NavLink>}
            {userName && <NavLink to="dashboard">Dashboard</NavLink>}
            <NavLink to="about">About</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginChange={refreshAuth} />} />
          <Route path="/checkin" element={userName ? <Checkin /> : <Login onLoginChange={refreshAuth} />} />
          <Route path="/dashboard" element={userName ? <Dashboard /> : <Login onLoginChange={refreshAuth} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <div>Albert</div>
          <a href="https://github.com/CMCHJK/startup.git">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: page not found</main>;
}