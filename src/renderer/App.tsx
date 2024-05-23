/* eslint-disable @typescript-eslint/no-unused-vars */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Break from './Break';
import Settings from './Settings';

import './App.css';
import Overview from './Overview';

function ViewManager() {
  const [showSettings, setShowSettings] = useState(false);
  const w = window.location;

  const isSettings = w.search === '?settings';
  const isLongBreak = w.search === '?long-break';

  if (isSettings) {
    return showSettings ? (
      <Settings setShowSettings={setShowSettings} />
    ) : (
      <Overview setShowSettings={setShowSettings} />
    );
  }

  return <Break isLongBreak={isLongBreak} />;
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
