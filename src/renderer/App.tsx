/* eslint-disable @typescript-eslint/no-unused-vars */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Break from './Break';
import Settings from './Settings';

import './App.css';
import Overview from './Overview';

function ViewManager() {
  const w = window.location;
  const [showSettings, setShowSettings] = useState(w.search === '?settings');

  const isSettings = w.search === '?settings';
  const isDashboard = w.search === '?dashboard';
  const isLongBreak = w.search === '?long-break';
  const isBreak = w.search === '?break';

  if (isDashboard || isSettings) {
    return showSettings ? (
      <Settings setShowSettings={setShowSettings} />
    ) : (
      <Overview setShowSettings={setShowSettings} />
    );
  }

  if (isBreak || isLongBreak) {
    return <Break isLongBreak={isLongBreak} />;
  }

  return null;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewManager />} />
      </Routes>
    </Router>
  );
}
