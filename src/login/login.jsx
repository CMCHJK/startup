import React, { useState, useEffect } from 'react';

export function Login() {
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('userName');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  function handleLogin() {
    localStorage.setItem('userName', username);
    setCurrentUser(username);
  }

  function handleLogout() {
    localStorage.removeItem('userName');
    setCurrentUser('');
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