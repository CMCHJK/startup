import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <h1>Health Score</h1>
          <nav>
            <NavLink to="">Home</NavLink>
            <NavLink to="login">Login</NavLink>
            <NavLink to="dashboard">Dashboard</NavLink>
            <NavLink to="about">About</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
