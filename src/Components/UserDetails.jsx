import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Locations from "./Locations";
import formatDate from '../helpers/formatDate';

const API = import.meta.env.VITE_API_URL;

function UserDetails() {
  const [user, setUser] = useState({});
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/users/${id}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        responseJSON.dob = formatDate(responseJSON.dob);
        setUser(responseJSON);
      })
      .catch((error) => console.error(error));
  }, [id, API]);

  const handleDelete = () => {
    deleteUser();
  };

  const deleteUser = () => {
    fetch(`${API}/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/users`);
        } else {
          console.error('Failed to delete user:', response.status, response.statusText);
        }
      })
      .catch((error) => console.error('Error:', error));
  };
  
  
  return (
    <article>
      <div className="profile-container">
        <img src={user.profile_pic} alt={`${user.username}'s profile`} width="200" height="200" />
        <div className="profile-info">
          <h3>
            {user.is_active ? <span>🟢</span> : <span>🔴</span>} {user.username}
          </h3>
          <h5>
            <span>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </span>
          </h5>
          <h6>Age: {user.age}</h6>
          <h6>Date of Birth: {new Date(user.dob).toLocaleDateString()}</h6>
          <h6>Gender: {user.gender}</h6>
        </div>
      </div>
      <div className="showNavigation">
        <div>
          <Link to={`/users`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/users/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <Locations />
    </article>
  );
}

export default UserDetails;




