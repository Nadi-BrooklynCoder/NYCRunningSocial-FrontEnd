import React from "react";
import { Link } from "react-router-dom";

function User({ user }) {
  return (
    <tr>
      <td>
        <img src={user.profile_pic} alt={`${user.username}'s profile`} width="100" height="100" />
      </td>
      <td>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>
        <span
          style={{
            height: "10px",
            width: "10px",
            backgroundColor: user.is_active ? "green" : "red",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></span>
      </td>
    </tr>
  );
};

export default User;

