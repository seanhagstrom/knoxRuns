import { useState } from 'react';
import AuthForm from './AuthForm';

import '../styles/App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>This is the layout page</h1>
      <Outlet />
    </div>
  );
}

export default App;
