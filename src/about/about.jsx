import React from 'react';

export function About() {
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
          <li><strong>HTML</strong>: multi-page structure + placeholders</li>
          <li><strong>CSS</strong>: responsive styling and layout</li>
          <li><strong>React</strong>: routing + components for login/dashboard</li>
          <li><strong>Service</strong>: login/register + storing check-ins + scoring endpoints</li>
          <li><strong>Database</strong>: users + check-ins + scores</li>
          <li><strong>WebSocket</strong>: live updates when students submit check-ins</li>
          <li><strong>3rd-party API</strong>: wellness tips / quotes / mindfulness prompts</li>
        </ul>
      </section>

      <section>
        <h2>Links</h2>
        <p>
          GitHub Repository:{' '}
          <a
            href="https://github.com/CMCHJK/startup.git"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/CMCHJK/startup.git
          </a>
        </p>
        <p>Author: Albert</p>
      </section>
    </main>
  );
}
