import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser({}));
    delete localStorage.token;
    navigate('/welcome');
  };

  return (
    <>
      {user.user_id && (
        <div>
          <h1>Navbar</h1>
          <NavLink to='/me'>Profile</NavLink>
          <NavLink to='/activities'>Activities</NavLink>
          <button onClick={handleLogout}>Logout</button>{' '}
        </div>
      )}
    </>
  );
}

export default Navbar;
