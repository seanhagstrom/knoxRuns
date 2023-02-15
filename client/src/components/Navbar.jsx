import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    delete localStorage.token;
    navigate('/welcome');
  };

  return (
    <div>
      <h1>Navbar</h1>
      <NavLink to='/me'>Profile</NavLink>
      <NavLink to='/activities'>Activities</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
