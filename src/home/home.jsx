import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const updatesKey = 'homeLiveUpdates';

export function Home() {
  const [userName, setUserName] = useState('');
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [tip, setTip] = useState('');
  const [healthScore, setHealthScore] = useState(null);

  useEffect(() => {
    const savedUpdates = localStorage.getItem(updatesKey);
    if (savedUpdates) {
      setLiveUpdates(JSON.parse(savedUpdates));
    }
  }, []);

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          setUserName('');
          return;
        }

        const data = await response.json();
        setUserName(data.email);
      } catch {
        setUserName('');
      }
    }

    loadCurrentUser();
  }, []);

  useEffect(() => {
    async function loadCheckins() {
      try {
        const response = await fetch('/api/checkins');

        if (!response.ok) {
          setHealthScore(null);
          return;
        }

        const data = await response.json();

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

        setHealthScore(computeScore(data[0]));
      } catch {
        setHealthScore(null);
      }
    }

    loadCheckins();
  }, []);

  useEffect(() => {
    fetch('/api/quote')
      .then((response) => response.json())
      .then((data) => {
        setTip(`${data.content} — ${data.author}`);
      })
      .catch(() => {
        setTip('Unable to load tip.');
      });
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${window.location.hostname}:4000`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLiveUpdates((prev) => {
        const nextUpdates = [data.msg, ...prev.slice(0, 19)];
        localStorage.setItem(updatesKey, JSON.stringify(nextUpdates));
        return nextUpdates;
      });
    };

    return () => {
      socket.close();
    };
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
        <h2>Live Updates (WebSocket)</h2>
        <p>Other students checking in right now:</p>
        {liveUpdates.length === 0 ? (
          <p>No live updates yet.</p>
        ) : (
          <ul>
            {liveUpdates.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Daily Wellness Tip (3rd-party API)</h2>
        <p>&quot;{tip}&quot;</p>
      </section>

      <section>
        <h2>Project Repository</h2>
        <p>
          GitHub:{' '}
          <a href="https://github.com/CMCHJK/startup.git" target="_blank" rel="noreferrer">
            https://github.com/CMCHJK/startup.git
          </a>
        </p>
      </section>

      <section>
        <h2>App Preview</h2>
        <img src="/temp_pic.png" alt="App preview image" width="300" />
      </section>
    </main>
  );
}