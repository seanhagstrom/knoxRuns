import React, { useEffect } from 'react';
import '../styles/App.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../store/authSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  console.log(user);

  useEffect(() => {
    if (user.user_id && user.is_verified) {
      navigate('me');
    } else if (user.user_id && !user.is_verified) {
      navigate('next-steps');
    } else {
      navigate('welcome');
    }
  }, [user]);

  return (
    <div>
      {location.pathname === '/welcome' ? (
        <Outlet />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
