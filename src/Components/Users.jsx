import { useState, useEffect } from "react";
import User from "./User";

const API = import.meta.env.VITE_API_URL;

function Users () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch(`${API}/users`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((responseJSON) => {
          setUsers(responseJSON);
        })
        .catch((error) => console.error(error));
    }, []);

      return (
        <table>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Username</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      );
      
}

export default Users;
