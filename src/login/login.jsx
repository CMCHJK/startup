import React, { useState, useEffect } from 'react';

export function Login({ onLoginChange }) {
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          setCurrentUser('');
          onLoginChange('');
          return;
        }

        const data = await response.json();
        setCurrentUser(data.email);
        onLoginChange(data.email);
      } catch {
        setCurrentUser('');
        onLoginChange('');
      }
    }

    loadCurrentUser();
  }, [onLoginChange]);

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
      const data = await response.json();
      setCurrentUser(data.email);
      onLoginChange(data.email);
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
      const data = await response.json();
      setCurrentUser(data.email);
      onLoginChange(data.email);
    } else {
      alert('Unable to create account');
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', {
      method: 'DELETE'
    });

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