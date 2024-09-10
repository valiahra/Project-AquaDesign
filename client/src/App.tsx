import './App.css';
import Root from './Root';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setAccessToken } from './axiosInstance';
import HomePage from './pages/HomePage/HomePage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRefresh } from './redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';
import AboutUS from './pages/AboutUsPage/AboutUsPage';
import ServicesFountain from './pages/ServicesFountainPage/ServicesFountainPage';
import Contacts from './pages/ContactsPage/ContactsPage';
import OurWorks from './pages/OurWorksPage/OurWorksPage';
import Projects from './pages/ProjectsPage/ProjectsPage';
import Constructor from './pages/ConstructorPage/ConstructorPage';
import OrderPage from './pages/OrderPage/OrderPage';
import OneFountain from './components/OneFountain/OneFountain';
import ApplicationForm from './components/ApplicationForm/ApplicationForm';
import ChatPage from './pages/ChatPage/ChatPage';
import ProtectedRoute from './components/hoc/ProtectedRoute';

import ManagerPage from './pages/ManagerPage/ManagerPage';
import UserPage from './pages/UserPage/UserPage';
import AdminPage from './pages/AdminPage/AdminPage';

import Footer from './widgets/Navbar/Footer';

function App() {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchRefresh())
      .then(unwrapResult)
      .then((result) => {
        setAccessToken(result.accessToken);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/aboutUs',
          element: <AboutUS />,
        },
        {
          path: '/services',
          element: <ServicesFountain />,
        },
        {
          path: '/contacts',
          element: <Contacts />,
        },
        {
          path: '/ourWorks',
          element: <OurWorks />,
        },
        {
          path: '/projects',
          element: <Projects />,
        },
        {
          path: '/constructor',
          element: <Constructor />,
        },
        {
          path: '/order',
          element: <OrderPage />,
        },
        {
          path: '/ourWorks/:id',
          element: <OneFountain />,
        },
        {
          path: '/order/createOrder',
          element: <ApplicationForm onClose={undefined} />,
        },
        {
          path: '/chat',
          element: (
            <ProtectedRoute isAllowed={!!user} redirect="/login">
              <ChatPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/manager',
          element: <ManagerPage orders={orders} setOrders={setOrders} />,
        },
        {
          path: '/user',
          element: <UserPage />,
        },
        {
          path: '/admin',
          element: <AdminPage />,
        },
        {
          path: '/progectsCardInfo/:id',
          element: <OneFountain />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
