import React, { useState, useEffect } from 'react';

export function Dashboard() {
  const [userName, setUserName] = useState('');
  const [updates, setUpdates] = useState([]);
  const [communityData, setCommunityData] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = "student" + Math.floor(Math.random() * 100);
      const messages = [
        `${randomUser} submitted a check-in`,
        `${randomUser} score updated`,
        `${randomUser} logged in`,
        `${randomUser} logged out`
      ];

      const msg = messages[Math.floor(Math.random() * messages.length)];

      setUpdates((prev) => [msg, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mockDatabase = [
      { user: "student01", score: 81 },
      { user: "student02", score: 65 },
      { user: "student03", score: 74 }
    ];

    setCommunityData(mockDatabase);
  }, []);

  return (
    <main className="container my-4 p-4 bg-white rounded">
      {/* Logged-in User Info */}
      <section>
        <h2>User</h2>
        <p>
          Username: <strong>{userName || 'Not logged in'}</strong>
        </p>
      </section>

      {/* Application Data (User Health Data) */}
      <section>
        <h2>Your Health Data (Application Data)</h2>
        <ul>
          <li>Sleep: 6.5 hours</li>
          <li>Stress level: High</li>
          <li>Exercise: 20 minutes</li>
          <li>Focus: Low</li>
        </ul>
      </section>

      {/* Health Score Output */}
      <section>
        <h2>Your Health Score</h2>
        <p>
          <strong>72 / 100</strong>
        </p>
        <p>Interpretation: Moderate risk – sleep consistency recommended.</p>
      </section>

      {/* Database Data Placeholder */}
      <section>
        <h2>Community Data (Database)</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {communityData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* WebSocket Data Placeholder */}
      <section className="live-updates">
        <h2>Live Updates (WebSocket)</h2>
          <ul>
            {updates.map((update, index) => (
              <li key={index}>{update}</li>
            ))}
          </ul>
      </section>

      {/* Third-party API Placeholder */}
      <section>
        <h2>Daily Mental Health Tip (3rd-party API)</h2>
        <p>&quot;Drink water and take 5 deep breaths before studying.&quot;</p>
      </section>
    </main>
  );
}
