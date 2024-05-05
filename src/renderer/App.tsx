import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Break from './Break';

import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Break />} />
      </Routes>
    </Router>
  );
}
