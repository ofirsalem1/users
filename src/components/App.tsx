import Table from './table/Table';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import UserDetails from './UserDetails/UserDetails';
import { User } from './table/table.types';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState<User[]>([] as User[]); // 10 users
  const [currentPage, setCurrentPage] = useState<number>(
    localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1
  );

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
    localStorage.setItem('currentPage', pageNumber.toString());
    setCurrentPage(pageNumber);
  };

  return (
    <HashRouter>
      {/* <Router> */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Table users={users} paginate={paginate} />} />
          <Route path="/:username" element={<UserDetails users={users} />} />
        </Routes>
      </div>
      {/* </Router> */}
    </HashRouter>
  );
}

export default App;
