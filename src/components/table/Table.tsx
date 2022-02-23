import PaginationComponent from '../PaginationComponent/PaginationComponent';
import './table.css';
import { TableProps, User } from './table.types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const Table = ({ users, paginate, currentPage }: TableProps) => {
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState<User[] | []>([]);
  const [sortValue, setSortValue] = useState<string>();

  //set the filtered users
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

  // sort users by first name, last name and age
  const selectHandler = (event: SelectChangeEvent<string>) => {
    const sortBy = event.target.value;
    const sortedUsers = filteredUsers.sort((a: any, b: any) => {
      if (sortBy === 'first-name') {
        return a.name.first.localeCompare(b.name.first);
      } else if (sortBy === 'last-name') {
        return a.name.last.localeCompare(b.name.last);
      } else if (sortBy === 'age') {
        return a.dob.age - b.dob.age;
      }
    });
    setFilteredUsers([...sortedUsers]);
    setSortValue(sortBy);
  };

  return (
    <div className="table-div">
      <div className="has-animation animation-ltr margin padding animate-in" data-delay="10">
        <h1 className="all-users-head">All users</h1>
      </div>
      {/* search input */}
      <Box sx={{ display: 'block', margin: 'auto', marginBottom: '-1rem' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2.9 }} />
        <TextField label="Search..." variant="standard" onChange={filterUsers} />
      </Box>
      {/* select for sort */}
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 220, margin: 'auto', marginBottom: '1rem' }}
      >
        <InputLabel>Sort by</InputLabel>
        <Select value={sortValue} onChange={selectHandler}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'first-name'}>First Name</MenuItem>
          <MenuItem value={'last-name'}>Last Name</MenuItem>
          <MenuItem value={'age'}>Age</MenuItem>
        </Select>
      </FormControl>
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
      <PaginationComponent
        usersPerPage={10}
        totalUsers={100000}
        paginate={paginate}
        page={currentPage}
      />
    </div>
  );
};

export default Table;
