import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleTextChange = (event) => {
    setCredentials({ ...credentials, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Logic to handle successful login
          navigate(`/`);
        } else {
          // Handle login failure
          console.error("Login failed");
        }
      })
      .catch((error) => console.error("catch", error));
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={credentials.email}
          placeholder="Email"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleTextChange}
          required
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginForm;
