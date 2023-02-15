import { useState, useEffect } from 'react';
import '../styles/App.css';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import Welcome from './Welcome';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token);
  const navigate = useNavigate();
  const user = useLoaderData();

  useEffect(() => {
    if (user) {
      navigate('/me');
    }
  }, []);

  return (
    <div>
      <Welcome />
      <h1>Nav Element will go here!</h1>
      <Outlet />
      <h1>Footer Element will go here!</h1>
    </div>
  );
}

export default App;
