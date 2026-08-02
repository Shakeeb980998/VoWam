import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import Home from '../features/home/pages/Home';
import Login from '../features/auth/pages/Login';
import DashboardHome from '../features/dashboard/pages/DashboardHome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

export default router;
