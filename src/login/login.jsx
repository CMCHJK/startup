import React, { useState, useEffect } from 'react';

export function Login({ onLoginChange }) {
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('userName');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  async function handleLogin() {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password: 'password'
      })
    });

    if (response.ok) {
      localStorage.setItem('userName', username);
      setCurrentUser(username);
      onLoginChange(username);
    } else {
      alert('Login failed');
    }
  }

  async function handleRegister() {
    const response = await fetch('/api/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password: 'password'
      })
    });

    if (response.ok) {
      localStorage.setItem('userName', username);
      setCurrentUser(username);
      onLoginChange(username);
    } else {
      alert('Unable to create account');
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', {
      method: 'DELETE'
    });

    localStorage.removeItem('userName');
    setCurrentUser('');
    onLoginChange('');
  }

  return (
    <main className="container my-4 p-4 bg-white rounded">
      <section>
        <h2 className="mb-3">Login</h2>

        <form>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>

          <button
            type="button"
            className="btn btn-success ms-2"
            onClick={handleRegister}
          >
            Create Account
          </button>

          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </form>
      </section>

      <section className="mt-5">
        <h3>Status</h3>
        <p>
          Current user:{' '}
          <strong>
            {currentUser ? currentUser : '[Not logged in]'}
          </strong>
        </p>
      </section>
    </main>
  );
}