import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser({}));
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
