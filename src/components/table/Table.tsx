import './table.css';
import { User } from './table.types';

const Table = ({ currentUsers }: { currentUsers: User[] }) => {
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
          {currentUsers.length > 0 &&
            currentUsers.map(user => (
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
