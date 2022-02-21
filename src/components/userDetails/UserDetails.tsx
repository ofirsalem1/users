import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../table/table.types';
import './userDetails.css';
const UserDetails = ({ users }: { users: User[] }) => {
  const navigate = useNavigate();
  const { username } = useParams();
  const firstName = username?.split('.')[0];
  const lastName = username?.split('.')[1];
  const user = users.find(user => user.name.first === firstName && user.name.last === lastName);

  return (
    <div className="user-details-div">
      <h1 className="user-details-head">User Details</h1>
      <div className="card">
        <img src={user?.picture.large} alt="image" />
        <h1>{user?.name.first}</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Last Name</strong>
              </td>
              <td>{user?.name.last}</td>
            </tr>
            <tr>
              <td>
                <strong>Gender</strong>
              </td>
              <td>{user?.gender} </td>
            </tr>
            <tr>
              <td>
                <strong>Age</strong>
              </td>
              <td>{user?.dob.age}</td>
            </tr>
            <tr>
              <td>
                <strong>Email</strong>
              </td>
              <td>{user?.email} </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="back-btn" onClick={() => navigate('/')}>
        Back to all users
      </button>
    </div>
  );
};

export default UserDetails;
