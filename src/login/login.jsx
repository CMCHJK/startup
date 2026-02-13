import React from 'react';

export function Login() {
  return (
    <main className="container my-4 p-4 bg-white rounded">
      <section>
        <h2 className="mb-3">Login</h2>

        <form>
          <div className="mb-3">
            <label htmlFor="login-username" className="form-label">
              Username
            </label>
            <input
              id="login-username"
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <button type="button" className="btn btn-primary">
            Login
          </button>
        </form>
      </section>

      <section className="mt-5">
        <h2 className="mb-3">Register</h2>

        <form>
          <div className="mb-3">
            <label htmlFor="register-username" className="form-label">
              Username
            </label>
            <input
              id="register-username"
              type="text"
              className="form-control"
              placeholder="Choose a username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="register-password" className="form-label">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              className="form-control"
              placeholder="Choose a password"
            />
          </div>

          <button type="button" className="btn btn-success">
            Create Account
          </button>
        </form>
      </section>

      <section>
        <h3>Status</h3>
        <p>
          Current user: <strong>[Not logged in]</strong>
        </p>
      </section>
    </main>
  );
}
