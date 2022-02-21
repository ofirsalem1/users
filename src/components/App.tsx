import Table from './Table/Table';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './UserDetails/UserDetails';
import { User } from './Table/table.types';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState<User[]>([] as User[]); // 10 users
  const [currentPage, setCurrentPage] = useState(1);

  /* Requests 10 users according to page  */
  useEffect(() => {
    axios
      .get(
        `https://randomuser.me/api/?page=${currentPage}&results=10&seed=abc&inc=gender,name,email,dob,picture,location`
      )
      .then(res => {
        setUsers(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentPage]);

  /* change the current page */
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Table users={users} paginate={paginate} />} />
          <Route path="/:username" element={<UserDetails users={users} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
