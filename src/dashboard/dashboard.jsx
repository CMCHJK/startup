import React, { useState, useEffect } from 'react';

const updatesKey = 'dashboardLiveUpdates';

export function Dashboard() {
  const [userName, setUserName] = useState('');
  const [updates, setUpdates] = useState([]);
  const [tip, setTip] = useState('');
  const [checkins, setCheckins] = useState([]);
  const [healthScore, setHealthScore] = useState(null);

  useEffect(() => {
    const savedUpdates = localStorage.getItem(updatesKey);
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
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
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${window.location.hostname}:4000`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setUpdates((prev) => {
        const nextUpdates = [data.msg, ...prev.slice(0, 19)];
        localStorage.setItem(updatesKey, JSON.stringify(nextUpdates));
        return nextUpdates;
      });
    };

    return () => {
      socket.close();
    };
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
    async function loadCheckins() {
      try {
        const response = await fetch('/api/checkins');

        if (!response.ok) {
          setCheckins([]);
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

        setCheckins(data);
        setHealthScore(computeScore(data[0]));
      } catch {
        setCheckins([]);
        setHealthScore(null);
      }
    }

    loadCheckins();
  }, []);

  function clearHistory() {
    alert('Check-in history is now stored in the service. Clear-history endpoint was not implemented for this deliverable.');
  }

  return (
    <main className="container my-4 p-4 bg-white rounded">
      <section>
        <h2>User</h2>
        <p>
          Username: <strong>{userName || 'Not logged in'}</strong>
        </p>
      </section>

      <section>
        <h2>Your Health Data (Application Data)</h2>

        {checkins.length === 0 ? (
          <p>No check-ins yet. Go submit one on the Check-in page.</p>
        ) : (
          <>
            <p>
              Latest check-in: <strong>{checkins[0].date}</strong>
            </p>
            <ul>
              <li>Sleep: {checkins[0].sleepHours} hours</li>
              <li>Exercise: {checkins[0].exerciseMinutes} minutes</li>
              <li>Stress (1-5): {checkins[0].stress}</li>
              <li>Mood (1-5): {checkins[0].mood}</li>
            </ul>

            <h3 className="mt-4">Recent history</h3>
            <ul>
              {checkins.slice(0, 5).map((c, idx) => (
                <li key={idx}>
                  {c.date} — sleep {c.sleepHours}h, exercise {c.exerciseMinutes}m, stress {c.stress}, mood {c.mood}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section>
        <h2>Your Health Score</h2>

        <div className="mb-3">
          <button type="button" className="btn btn-outline-danger" onClick={clearHistory} disabled={checkins.length === 0}>
            Clear check-in history
          </button>
        </div>

        {healthScore === null ? (
          <p>No score yet (submit a check-in first).</p>
        ) : (
          <>
            <p>
              <strong>{healthScore} / 100</strong>
            </p>
            <p>
              Interpretation:{' '}
              {healthScore >= 80
                ? 'Doing well — keep consistency.'
                : healthScore >= 60
                ? 'Moderate — improve sleep/exercise consistency.'
                : 'High risk — consider reducing stress and improving rest.'}
            </p>
          </>
        )}
      </section>

      <section className="live-updates">
        <h2>Live Updates (WebSocket)</h2>
        {updates.length === 0 ? (
          <p>No live updates yet.</p>
        ) : (
          <ul>
            {updates.map((update, index) => (
              <li key={index}>{update}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Daily Mental Health Tip (3rd-party API)</h2>
        <p>&quot;{tip}&quot;</p>
      </section>
    </main>
  );
}