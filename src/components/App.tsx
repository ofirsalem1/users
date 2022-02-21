import Table from './table/Table';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './userDetails/UserDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/:username" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
