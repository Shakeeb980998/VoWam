import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import Home from '../features/home/pages/Home';
import Login from '../features/auth/pages/Login';
import DashboardHome from '../features/dashboard/pages/DashboardHome';
import Roles from '../features/settings/pages/Roles';
import Departments from '../features/settings/pages/Departments';
import Designations from '../features/settings/pages/Designations';
import Navigations from '../features/settings/pages/Navigations';
import Users from '../features/settings/pages/Users';
import UserForm from '../features/settings/pages/UserForm';

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
      },
      {
        path: 'roles',
        element: <Roles />,
      },
      {
        path: 'departments',
        element: <Departments />,
      },
      {
        path: 'designation',
        element: <Designations />,
      },
      {
        path: 'navigations',
        element: <Navigations />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'users/create',
        element: <UserForm />,
      },
      {
        path: 'users/:id/edit',
        element: <UserForm />,
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

export default router;
