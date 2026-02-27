import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const [userName, setUserName] = useState('');
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [tip, setTip] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  useEffect(() => {
    function getDailyTip() {
      return 'Take a 10-minute walk today to improve focus and mood.';
    }
    setTip(getDailyTip());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = `User${Math.floor(Math.random() * 1000)}`;
      const messages = [
        `${randomUser} submitted a check-in`,
        `${randomUser} score updated`,
        `${randomUser} opened the dashboard`
      ];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setLiveUpdates((prev) => [msg, ...prev.slice(0, 3)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container my-4 p-4 bg-white rounded">
      <section>
        <h2>What is this?</h2>
        <p>
          A web application for college students to track physical and mental health through daily check-ins and receive an
          easy-to-understand health score.
        </p>
      </section>

      <section>
        <h2>Authentication</h2>
        <p>
          Current user: <strong>{userName || '[Not logged in]'}</strong>
        </p>

        {userName ? (
          <p>
            Go to your <Link to="/dashboard">Dashboard</Link>.
          </p>
        ) : (
          <p>
            <Link to="/login">Go to Login</Link> to access your personal dashboard.
          </p>
        )}
      </section>

      <section>
        <h2>Your Health Score (Sample)</h2>
        <p>
          Score: <strong>72 / 100</strong>
        </p>
        <p>Status: Moderate stress, low sleep consistency</p>
      </section>

      <section>
        <h2>Community Statistics (Database Data)</h2>
        <ul>
          <li>Average score: 68</li>
          <li>Total users: 1240</li>
          <li>Most common issue: Lack of sleep</li>
        </ul>
      </section>

      <section>
        <h2>Live Updates (WebSocket)</h2>
        <p>Other students checking in right now:</p>
        <ul>
          {liveUpdates.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Daily Wellness Tip (3rd-party API)</h2>
        <p>&quot;{tip}&quot;</p>
      </section>

      <section>
        <h2>App Preview</h2>
        <img src="/temp_pic.png" alt="App preview image" width="300" />
      </section>
    </main>
  );
}