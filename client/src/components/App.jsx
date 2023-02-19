import { useState, useEffect } from 'react';
import '../styles/App.css';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Welcome from './Welcome';
import { getMe } from '../api/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token);
  const navigate = useNavigate();
  // const user = useLoaderData();
  let location = useLocation();

  useEffect(() => {
    async () => {
      const user = await getMe();
      if (user && user.is_verified) {
        navigate('me');
      } else if (user && !user.is_verified) {
        navigate('next-steps');
      } else {
        navigate('welcome');
      }
    };
  }, []);

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
