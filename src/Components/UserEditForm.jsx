import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import formatDate from '../helpers/formatDate'

const API = import.meta.env.VITE_API_URL;

function UserEditForm() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    profile_pic: "",
    gender: "",
  });

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: id === 'dob' ? formatDate(value) : value });
  };
  

  const updateUser = () => {
    fetch(`${API}/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        navigate(`/users/${id}`);
      })
      .catch((error) => console.error("catch", error));
  };

  useEffect(() => {
    fetch(`${API}/users/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        responseJSON.dob = formatDate(responseJSON.dob);
        setUser(responseJSON);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={user.username}
          type="text"
          onChange={handleTextChange}
          placeholder="Username"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          required
          value={user.email}
          placeholder="Email"
          onChange={handleTextChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleTextChange}
        />
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          name="age"
          value={user.age}
          placeholder="Age"
          onChange={handleTextChange}
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          id="dob"
          type="date"
          name="dob"
          value={user.dob}
          onChange={handleTextChange}
        />
        <label htmlFor="profile_pic">Profile Picture URL:</label>
        <input
          id="profile_pic"
          type="text"
          name="profile_pic"
          value={user.profile_pic}
          placeholder="Profile Picture URL"
          onChange={handleTextChange}
        />
        <label htmlFor="gender">Gender:</label>
        <input
          id="gender"
          type="text"
          name="gender"
          value={user.gender}
          placeholder="Gender"
          onChange={handleTextChange}
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/users/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default UserEditForm;
