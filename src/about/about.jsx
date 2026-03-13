import React, { useEffect, useState } from 'react';

export function About() {
  const [lastLoaded, setLastLoaded] = useState('');
  const [tip, setTip] = useState('');

  useEffect(() => {
    const now = new Date();
    setLastLoaded(now.toLocaleString());
  }, []);

  useEffect(() => {
    fetch('/api/quote')
      .then((response) => response.json())
      .then((data) => {
        setTip(`${data.content} — ${data.author}`);
      })
      .catch(() => {
        setTip('Unable to load wellness tip.');
      });
  }, []);

  return (
    <main className="container my-4 p-4 bg-white rounded">
      <section>
        <h2>Project Summary</h2>
        <p>
          This web application helps college students track both physical and mental
          health through quick daily check-ins. The system produces a simple score
          and highlights trends that may indicate potential health risks.
        </p>
      </section>

      <section>
        <h2>Current Features</h2>
        <ul>
          <li>
            <strong>Authentication Service</strong>: users can register, login, and logout through backend API endpoints
          </li>
          <li>
            <strong>Protected Endpoints</strong>: certain API routes require authentication
          </li>
          <li>
            <strong>LocalStorage</strong>: check-in history stored locally in the browser
          </li>
          <li>
            <strong>React Hooks</strong>: application state managed using <code>useState</code> and <code>useEffect</code>
          </li>
          <li>
            <strong>Third-party API</strong>: wellness tip retrieved through the backend service
          </li>
        </ul>
        <p>
          Page loaded at: <strong>{lastLoaded}</strong>
        </p>
      </section>

      <section>
        <h2>Example Wellness Tip (3rd-party API)</h2>
        <p>&quot;{tip}&quot;</p>
      </section>

      <section>
        <h2>Technology Stack</h2>
        <ul>
          <li><strong>React</strong>: frontend components and routing</li>
          <li><strong>Node.js + Express</strong>: backend web service</li>
          <li><strong>BCrypt</strong>: password hashing for authentication</li>
          <li><strong>REST API</strong>: communication between frontend and backend</li>
          <li><strong>Third-party API</strong>: external wellness tip service</li>
        </ul>
      </section>

      <section>
        <h2>Links</h2>
        <p>
          GitHub Repository:{' '}
          <a href="https://github.com/CMCHJK/startup.git" target="_blank" rel="noreferrer">
            https://github.com/CMCHJK/startup.git
          </a>
        </p>
        <p>Author: Albert</p>
      </section>
    </main>
  );
}