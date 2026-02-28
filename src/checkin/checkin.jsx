import React, { useEffect, useState } from 'react';

export function Checkin() {
  const [userName, setUserName] = useState('');
  const [sleepHours, setSleepHours] = useState(7);
  const [exerciseMinutes, setExerciseMinutes] = useState(20);
  const [stress, setStress] = useState(3);
  const [mood, setMood] = useState(3);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('userName') || '';
    setUserName(u);
  }, []);

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

  function saveCheckin() {
    if (!userName) {
      setSavedMsg('Please login first.');
      return;
    }

    const entry = {
      user: userName,
      date: new Date().toLocaleString(),
      sleepHours: Number(sleepHours),
      exerciseMinutes: Number(exerciseMinutes),
      stress: Number(stress),
      mood: Number(mood),
    };

    const prev = loadCheckins();
    const next = [entry, ...prev].slice(0, 30);
    localStorage.setItem('checkins', JSON.stringify(next));
    setSavedMsg('Saved!');
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

      {savedMsg && <p className="mt-3"><strong>{savedMsg}</strong></p>}
    </main>
  );
}