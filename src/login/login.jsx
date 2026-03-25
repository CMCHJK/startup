import React, { useState, useEffect } from 'react';

export function Login({ onLoginChange }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
          setCurrentUser('');
          if (onLoginChange) {
            onLoginChange('');
          }
          return;
        }

        const data = await response.json();
        setCurrentUser(data.email || '');
        if (onLoginChange) {
          onLoginChange(data.email || '');
        }
      } catch {
        setCurrentUser('');
        if (onLoginChange) {
          onLoginChange('');
        }
      }
    }

    loadCurrentUser();
  }, [onLoginChange]);

  async function handleLogin() {
    setMessage('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response.ok) {
      const data = await response.json();
      setCurrentUser(data.email || '');
      if (onLoginChange) {
        onLoginChange(data.email || '');
      }
      setMessage('Login successful.');
    } else {
      setMessage('Login failed.');
    }
  }

  async function handleRegister() {
    setMessage('');

    const response = await fetch('/api/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response.ok) {
      const data = await response.json();
      setCurrentUser(data.email || '');
      if (onLoginChange) {
        onLoginChange(data.email || '');
      }
      setMessage('Account created.');
    } else if (response.status === 409) {
      setMessage('User already exists.');
    } else {
      setMessage('Unable to create account.');
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', {
      method: 'DELETE'
    });

    setCurrentUser('');
    if (onLoginChange) {
      onLoginChange('');
    }
    setMessage('Logged out.');
  }

  return (
    <main className="container my-4 p-4 bg-white rounded">
      <section>
        <h2 className="mb-3">Login</h2>

        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
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

      <section className="mt-4">
        <h3>Status</h3>
        <p>
          Current user: <strong>{currentUser || '[Not logged in]'}</strong>
        </p>
        {message && <p><strong>{message}</strong></p>}
      </section>
    </main>
  );
}