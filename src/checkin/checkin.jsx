import React, { useEffect, useState } from 'react';

export function Checkin() {
  const [userName, setUserName] = useState('');
  const [sleepHours, setSleepHours] = useState(7);
  const [exerciseMinutes, setExerciseMinutes] = useState(20);
  const [stress, setStress] = useState(3);
  const [mood, setMood] = useState(3);
  const [savedMsg, setSavedMsg] = useState('');

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

  async function saveCheckin() {
    if (!userName) {
      setSavedMsg('Please login first.');
      return;
    }

    const response = await fetch('/api/checkins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sleepHours: Number(sleepHours),
        exerciseMinutes: Number(exerciseMinutes),
        stress: Number(stress),
        mood: Number(mood),
        date: new Date().toLocaleString()
      })
    });

    if (response.ok) {
      setSavedMsg('Saved!');
    } else if (response.status === 401) {
      setSavedMsg('Please login first.');
    } else {
      setSavedMsg('Unable to save check-in.');
    }
  }

  return (
    <main className="container my-4 p-4 bg-white rounded">
      <h2 className="mb-3">Daily Check-in</h2>

      <p>
        Current user: <strong>{userName || '[Not logged in]'}</strong>
      </p>

      <div className="mb-3">
        <label className="form-label">Sleep (hours)</label>
        <input
          type="number"
          className="form-control"
          min="0"
          max="24"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Exercise (minutes)</label>
        <input
          type="number"
          className="form-control"
          min="0"
          max="600"
          value={exerciseMinutes}
          onChange={(e) => setExerciseMinutes(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Stress (1-5)</label>
        <input
          type="number"
          className="form-control"
          min="1"
          max="5"
          value={stress}
          onChange={(e) => setStress(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mood (1-5)</label>
        <input
          type="number"
          className="form-control"
          min="1"
          max="5"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </div>

      <button type="button" className="btn btn-primary" onClick={saveCheckin}>
        Save Check-in
      </button>

      {savedMsg && (
        <p className="mt-3">
          <strong>{savedMsg}</strong>
        </p>
      )}
    </main>
  );
}