import { useState } from 'react';

import '../styles/App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Nav Element will go here!</h1>
      <Outlet />
      <h1>Footer Element will go here!</h1>
    </div>
  );
}

export default App;
