import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { getMe } from './api/auth';
import Activities from './components/Activities';
import Activity from './components/Activity';
import App from './components/App';
import AuthForm from './components/AuthForm';
import NextSteps from './components/NextSteps';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import './styles/index.css';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // loader: getMe,
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
        path: 'next-steps',
        element: <NextSteps />,
      },
      {
        path: 'next-steps/:verification_string',
        element: <NextSteps />,
      },
      {
        path: 'me',
        element: <Profile />,
      },
      {
        path: 'activities',
        element: <Activities />,
      },
      {
        path: 'activities/:activityId',
        element: <Activity />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
