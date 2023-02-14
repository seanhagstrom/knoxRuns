import { useState } from 'react';
import '../styles/App.css';
import { Outlet } from 'react-router-dom';
import Welcome from './Welcome';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token);

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
