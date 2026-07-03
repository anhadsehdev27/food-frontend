import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import RegistrationForm from './RegisterUser.jsx';
import DashboardLayout from './Dashboard.jsx';
import Menu from "./AddMenu.jsx"
import ListRegisterUser from './ListRegisterUser.jsx';
import ListMenu from './ListMenu.jsx';
import Item from './AddItem.jsx';
import ListItem from './ListItem.jsx';
import RegisterRestaurant from './RegisterRestaurant.jsx';
import ListRestaurant from './ListRegisterRestaurant.jsx';
import RegisterResMenu from './RegisterResMenu.jsx';

// 1. Define your routes
const router = createBrowserRouter([
  {
  path: "/",
  element: <DashboardLayout />,
  children: [
    {
      path: "/home",
      element: <App />, // Your root or home component
    },
     {
      path: "/menu/:id?",
      element: <Menu />, // Your root or home component
    },
    
     {
      path: "/ListMenu",
      element: <ListMenu />, // Your root or home component
    },
    {
      path: "/user",
      element: <RegistrationForm />, // Your registration form component
    },
    {
      path: "/list/users",
      element: <ListRegisterUser />, // Your list registered users component
    },
    {
    path: "/item/:id?",
    element: <Item />
    },
    {
      path: "/ListItem",
      element: <ListItem />, // Your root or home component
    },
     {
      path: "/Restaurant",
      element: <RegisterRestaurant />, // Your registration form component
    },
    {
      path: "/ListRestaurant",
      element: <ListRestaurant />, // Your list registered restaurants component
    },
    {
      path: "/RegisterResMenu",
      element: <RegisterResMenu />, // Your registration form component
    },

  ]

}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
