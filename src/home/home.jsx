import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const [userName, setUserName] = useState('');
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [tip, setTip] = useState('');
  const [healthScore, setHealthScore] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  useEffect(() => {
  function loadCheckins() {
    const text = localStorage.getItem('checkins');
    if (!text) return [];
    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function computeScore(entry) {
    if (!entry) return null;

    const sleep = Number(entry.sleepHours);
    const exercise = Number(entry.exerciseMinutes);
    const stress = Number(entry.stress);
    const mood = Number(entry.mood);

    const sleepScore = clamp((sleep / 8) * 40, 0, 40);
    const exerciseScore = clamp((exercise / 30) * 30, 0, 30);
    const stressScore = clamp((6 - stress) * 5, 0, 25);
    const moodScore = clamp(mood * 1, 0, 5);

    return Math.round(clamp(sleepScore + exerciseScore + stressScore + moodScore, 0, 100));
  }

  const data = loadCheckins();
  setHealthScore(computeScore(data[0]));
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
            Go to your <Link to="/dashboard">Dashboard</Link> or submit a <Link to="/checkin">Check-in</Link>.
          </p>
        ) : (
          <p>
            <Link to="/login">Go to Login</Link> to access your personal dashboard.
          </p>
        )}
      </section>

      <section>
        <h2>Your Health Score</h2>

        {healthScore === null ? (
          <p>No score yet. Submit your first <Link to="/checkin">check-in</Link>.</p>
        ) : (
          <>
            <p>
              Score: <strong>{healthScore} / 100</strong>
            </p>
            <p>
              Status:{' '}
              {healthScore >= 80
                ? 'Doing well — keep consistency.'
                : healthScore >= 60
                ? 'Moderate — improve sleep/exercise consistency.'
                : 'High risk — prioritize rest and stress reduction.'}
            </p>
          </>
        )}
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