import PaginationComponent from '../PaginationComponent/PaginationComponent';
import './table.css';
import { User } from './table.types';
import { useNavigate } from 'react-router-dom';

const Table = ({ users, paginate }: { users: User[]; paginate: (pageNumber: number) => void }) => {
  const navigate = useNavigate();

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
            <th className="details-th">Details </th>
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
