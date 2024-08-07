import { useState, useEffect } from "react";
import User from "./User";

const API = import.meta.env.VITE_API_URL;

function Users() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    fetch(`${API}/users`)
      .then((response) => response.json())
      .then((responseJSON) => {
        setUsers(responseJSON);
        localStorage.setItem("users", JSON.stringify(responseJSON));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Username</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>No runners found. <Link to="/users/new">Add a runner</Link></p>
        </div>
      )}
    </div>
  );
}

export default Users;
