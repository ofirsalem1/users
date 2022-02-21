import { useState, useEffect } from 'react';
import PaginationComponent from './PaginationComponent/PaginationComponent';
import Table from './table/Table';
import { User } from './table/table.types';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState<User[]>([] as User[]); // all the product
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(
        'https://randomuser.me/api/?page=1&results=10&seed=abc&inc=gender,name,email,dob,picture,location'
      )
      .then(res => {
        setUsers(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const indexOfLastUser = currentPage * usersPerPage; // 1 * 4 = 4
  const indexOfFirstUser = indexOfLastUser - usersPerPage; // 4 - 4 = 0
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // 0 1 2 3

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber); // change the current page
  };

  return (
    <div className="App">
      <h1>All users</h1>
      <Table currentUsers={currentUsers} />
      <PaginationComponent
        productsPerPage={usersPerPage}
        totalProducts={users.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;