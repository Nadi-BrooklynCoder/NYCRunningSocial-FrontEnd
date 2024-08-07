import { Link } from "react-router-dom";
import { useState } from "react";
import '../App.css'

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <h1>
        <Link to="/users">NYC Running Social</Link>
      </h1>
      <div>
        {isLoggedIn ? (
          <>
            <button onClick={handleSignOut}>Sign Out</button>
            <button>
              <Link to="/users">Users</Link>
            </button>
            <button>
              <Link to="/locations">Locations</Link>
            </button>
          </>
        ) : (
          <>
            <button>
              <Link to="/signup">Sign Up</Link>
            </button>
            <button>
              <Link to="/login">Login</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

