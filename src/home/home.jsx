import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main className="container my-4 p-4 bg-white rounded">
      {/* Application Description */}
      <section>
        <h2>What is this?</h2>
        <p>
          A web application for college students to track physical and mental health through daily check-ins and receive an
          easy-to-understand health score.
        </p>
      </section>

      {/* Authentication Placeholder */}
      <section>
        <h2>Authentication</h2>
        <p>Login to access your personal health dashboard.</p>
        <p>
          Current user: <strong>[Not logged in]</strong>
        </p>
        <Link to="/login">Go to Login</Link>
      </section>

      {/* Application Data Placeholder */}
      <section>
        <h2>Your Health Score (Sample)</h2>
        <p>
          Score: <strong>72 / 100</strong>
        </p>
        <p>Status: Moderate stress, low sleep consistency</p>
      </section>

      {/* Database Data Placeholder */}
      <section>
        <h2>Community Statistics (Database Data)</h2>
        <ul>
          <li>Average score: 68</li>
          <li>Total users: 1240</li>
          <li>Most common issue: Lack of sleep</li>
        </ul>
      </section>

      {/* WebSocket Placeholder */}
      <section>
        <h2>Live Updates (WebSocket)</h2>
        <p>Other students checking in right now:</p>
        <ul>
          <li>User123 submitted a check-in</li>
          <li>User456 score updated</li>
        </ul>
      </section>

      {/* Third-party API Placeholder */}
      <section>
        <h2>Daily Wellness Tip (3rd-party API)</h2>
        <p>&quot;Take a 10-minute walk today to improve focus and mood.&quot;</p>
      </section>

      {/* Images Placeholder */}
      <section>
        <h2>App Preview</h2>
        <img src="/temp_pic.png" alt="App preview image" width="300" />
      </section>
    </main>
  );
}
