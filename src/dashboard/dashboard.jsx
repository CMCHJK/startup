import React from 'react';

export function Dashboard() {
  return (
    <main className="container my-4 p-4 bg-white rounded">
      {/* Logged-in User Info */}
      <section>
        <h2>User</h2>
        <p>
          Username: <strong>demo_user</strong>
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
            <tr>
              <td>student01</td>
              <td>81</td>
            </tr>
            <tr>
              <td>student02</td>
              <td>65</td>
            </tr>
            <tr>
              <td>student03</td>
              <td>74</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* WebSocket Data Placeholder */}
      <section className="live-updates">
        <h2>Live Updates (WebSocket)</h2>
        <ul>
          <li>student07 just submitted a check-in</li>
          <li>student12 score updated to 88</li>
          <li>student03 logged out</li>
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
