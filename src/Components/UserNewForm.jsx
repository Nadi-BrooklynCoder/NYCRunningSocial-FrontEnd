import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function UserNewForm() {
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

  const addUser = () => {
    fetch(`${API}/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/users`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className="New">
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
          value={user.email}
          placeholder="Email"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          value={user.age}
          placeholder="Age"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          id="dob"
          type="date"
          value={user.dob}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="profile_pic">Profile Picture URL:</label>
        <input
          id="profile_pic"
          type="url"
          value={user.profile_pic}
          placeholder="Profile Picture URL"
          onChange={handleTextChange}
        />
        <label htmlFor="gender">Gender:</label>
        <input
          id="gender"
          type="text"
          value={user.gender}
          placeholder="Gender"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default UserNewForm;
