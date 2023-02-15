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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token);
  const navigate = useNavigate();
  const user = useLoaderData();
  let location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('me');
    } else {
      navigate('welcome');
    }
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
