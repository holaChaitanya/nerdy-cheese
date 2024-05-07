import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Break from './Break';
import Settings from './Settings';

import './App.css';
// import 'tailwindcss/tailwind.css';

function ViewManager() {
  const w = window.location;

  const isSettings = w.search === '?settings';

  return isSettings ? <Settings /> : <Break />;
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
