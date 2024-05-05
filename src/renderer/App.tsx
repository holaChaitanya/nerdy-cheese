import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Break from './Break';

import './App.css';

// http://localhost:1212/settings

function ViewManager() {
  const w = window.location;

  const isSettings = w.search === '?settings';

  return isSettings ? <p>This is Settings</p> : <Break />;
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
