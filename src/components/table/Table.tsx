import PaginationComponent from '../PaginationComponent/PaginationComponent';
import './table.css';
import { User } from './table.types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([] as User[]); // 10 users
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

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
    <div className="table-div">
      <h1>All users</h1>
      <table id="users">
        <thead>
          <tr>
            <th>Picture </th>
            <th>Full name </th>
            <th>Age </th>
            <th>Gender </th>
            <th>Email </th>
            <th>Details </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, i) => (
              <tr key={i}>
                <td>
                  <img src={user.picture.thumbnail} alt="user-pic" />
                </td>
                <td>
                  {user.name.first[0]}.{user.name.last}
                </td>
                <td>{user.dob.age}</td>
                <td>{user.gender}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/${user.name.first[0]}.${user.name.last}`)}
                    className="more-details-btn"
                  >
                    <span>More Details </span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PaginationComponent usersPerPage={usersPerPage} totalUsers={100000} paginate={paginate} />
    </div>
  );
};

export default Table;
