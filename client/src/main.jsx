import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getMe } from './api/auth';
import App from './components/App';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import './styles/index.css';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: getMe,
    children: [
      {
        path: 'welcome',
        element: <Welcome />,
      },
      {
        path: 'login',
        element: <AuthForm />,
      },
      {
        path: 'signup',
        element: <AuthForm />,
      },
      {
        path: 'me',
        element: <Profile />,
        loader: getMe,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
