import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Break from './Break';
import Settings from './Settings';

import './App.css';

function ViewManager() {
  const w = window.location;

  const isSettings = w.search === '?settings';
  const isLongBreak = w.search === '?long-break';

  if (isSettings) {
    return <Settings />;
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
