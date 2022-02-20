import './table.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  dob: { age: number; date: string };
  email: string;
  gender: string;
  location: any;
  name: { first: string; last: string };
  picture: { thumbnail: string };
}

const Table = () => {
  const [users, setUsers] = useState<User[] | []>([]);
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

  return (
    <div className="table-div">
      <table id="users">
        <thead>
          <tr>
            <th>Picture </th>
            <th>Full name </th>
            <th>Email </th>
            <th>Gender </th>
            <th>Age </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map(user => (
              <tr>
                <td>
                  <img src={user.picture.thumbnail} alt="user-pic" />
                </td>
                <td>
                  {user.name.first[0]}.{user.name.last}
                </td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.gender}</td>
                <td>{user.dob.age}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
