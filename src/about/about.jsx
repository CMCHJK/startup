import React, { useEffect, useState } from 'react';

export function About() {
  const [lastLoaded, setLastLoaded] = useState('');

  useEffect(() => {
    const now = new Date();
    setLastLoaded(now.toLocaleString());
  }, []);

  return (
    <main className="container my-4 p-4 bg-white rounded">
      <section>
        <h2>Project Summary</h2>
        <p>
          This web application helps college students track both physical and mental
          health through quick daily check-ins. The system produces a simple score
          and highlights trends that may indicate risk.
        </p>
      </section>

      <section>
        <h2>React P2 Reactivity (What works now)</h2>
        <ul>
          <li>
            <strong>LocalStorage mock</strong>: user login state stored as <code>userName</code>
          </li>
          <li>
            <strong>WebSocket mock</strong>: live updates simulated with <code>setInterval</code>
          </li>
          <li>
            <strong>3rd-party API mock</strong>: daily wellness tip is a hard-coded response
          </li>
          <li>
            <strong>Hooks</strong>: components use <code>useState</code> and <code>useEffect</code>
          </li>
        </ul>
        <p>
          Page loaded at: <strong>{lastLoaded}</strong>
        </p>
      </section>

      <section>
        <h2>Planned Features</h2>
        <ul>
          <li>Daily check-ins (sleep, exercise, stress, focus, mood)</li>
          <li>Personal score + trend breakdown</li>
          <li>Community stats and comparisons</li>
          <li>Live activity feed (real-time updates)</li>
        </ul>
      </section>

      <section>
        <h2>Technology Plan (Placeholders)</h2>
        <ul>
          <li><strong>React</strong>: routing + components for home/login/dashboard/about</li>
          <li><strong>Service</strong>: endpoints for login/register/check-ins/scoring (future deliverable)</li>
          <li><strong>Database</strong>: users + check-ins + scores (future deliverable)</li>
          <li><strong>WebSocket</strong>: real-time updates (future deliverable)</li>
          <li><strong>3rd-party API</strong>: wellness tips (future deliverable)</li>
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