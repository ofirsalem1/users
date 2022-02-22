import PaginationComponent from '../PaginationComponent/PaginationComponent';
import './table.css';
import { User } from './table.types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Table = ({ users, paginate }: { users: User[]; paginate: (pageNumber: number) => void }) => {
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState<User[] | []>([]);
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // filter users by first name , last name, email and age
  const filterUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value.toLowerCase();
    const filterUserArr = users.filter(user => {
      return (
        user.name.first.toLowerCase().includes(userInput) ||
        user.name.last.toLowerCase().includes(userInput) ||
        user.email.toLowerCase().includes(userInput) ||
        user.dob.age.toString().includes(userInput)
      );
    });
    setFilteredUsers(filterUserArr);
  };

  return (
    <div className="table-div">
      <div className="has-animation animation-ltr margin padding animate-in" data-delay="10">
        <h1 className="all-users-head">All users</h1>
      </div>
      {/* search input */}
      <Box sx={{ display: 'block', margin: '1rem auto' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2.9 }} />
        <TextField label="Search..." variant="standard" onChange={filterUsers} />
      </Box>
      <table id="users">
        <thead>
          <tr>
            <th>Picture </th>
            <th>Full name </th>
            <th>Age </th>
            <th>Gender </th>
            <th>Email </th>
            <th className="details-th">Details </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 &&
            filteredUsers.map((user, i) => (
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
                    onClick={() => navigate(`/${user.name.first}.${user.name.last}`)}
                    className="more-details-btn"
                  >
                    <span>More Details </span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PaginationComponent usersPerPage={10} totalUsers={100000} paginate={paginate} />
    </div>
  );
};

export default Table;
