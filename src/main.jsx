import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

import Auth from "./Auth";
import DashboardLayout from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

import App from "./App.jsx";
import RegistrationForm from "./RegisterUser.jsx";
import Menu from "./AddMenu.jsx";
import ListRegisterUser from "./ListRegisterUser.jsx";
import ListMenu from "./ListMenu.jsx";
import Item from "./AddItem.jsx";
import ListItem from "./ListItem.jsx";
import RegisterRestaurant from "./RegisterRestaurant.jsx";
import ListRestaurant from "./ListRegisterRestaurant.jsx";
import RegisterResMenu from "./RegisterResMenu.jsx";
import ListResMenu from "./ListResMenu.jsx";
import Orders from "./Order.jsx";
import OrderItem from "./OrderItem.jsx";
import Payment from "./Payment.jsx";
import ResOrderList from "./ResOrderList.jsx";
import UserOrderList from "./UserOrderList.jsx";

const router = createBrowserRouter([
  // Authentication Page
  {
    path: "/",
    element: <Auth />,
  },

  // Protected Pages
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/home",
        element: <App />,
      },

      {
        path: "/menu/:id?",
        element: (
          <ProtectedRoute allowedRoles={[1, 3]}>
            <Menu />
          </ProtectedRoute>
        ),
      },

      {
        path: "/ListMenu",
        element: (
          <ProtectedRoute allowedRoles={[1, 3]}>
            <ListMenu />
          </ProtectedRoute>
        ),
      },

      {
        path: "/user",
        element: (
          <ProtectedRoute allowedRoles={[1]}>
            <RegistrationForm />
          </ProtectedRoute>
        ),
      },

      {
        path: "/list/users",
        element: (
          <ProtectedRoute allowedRoles={[1]}>
            <ListRegisterUser />
          </ProtectedRoute>
        ),
      },

      {
        path: "/item/:id?",
        element: (
          <ProtectedRoute allowedRoles={[1, 3]}>
            <Item />
          </ProtectedRoute>
        ),
      },

      {
        path: "/ListItem",
        element: (
          <ProtectedRoute allowedRoles={[1, 3]}>
            <ListItem />
          </ProtectedRoute>
        ),
      },

      {
        path: "/Restaurant",
        element: (
          <ProtectedRoute allowedRoles={[1]}>
            <RegisterRestaurant />
          </ProtectedRoute>
        ),
      },

      {
        path: "/ListRestaurant",
        element: (
          <ProtectedRoute allowedRoles={[1]}>
            <ListRestaurant />
          </ProtectedRoute>
        ),
      },

      {
        path: "/RegisterResMenu",
        element: (
          <ProtectedRoute allowedRoles={[1, 3]}>
            <RegisterResMenu />
          </ProtectedRoute>
        ),
      },

      {
        path: "/ListResMenu",
        element: (
          <ProtectedRoute allowedRoles={[1, 3]}>
            <ListResMenu />
          </ProtectedRoute>
        ),
      },

      {
        path: "/Orders",
        element: (
          <ProtectedRoute allowedRoles={[2]}>
            <Orders />
          </ProtectedRoute>
        ),
      },

      {
        path: "/OrderItem",
        element: (
          <ProtectedRoute allowedRoles={[2]}>
            <OrderItem />
          </ProtectedRoute>
        ),
      },

      {
        path: "/Payment",
        element: (
          <ProtectedRoute allowedRoles={[2]}>
            <Payment />
          </ProtectedRoute>
        ),
      },

      {
        path: "/ResOrderList",
        element: (
          <ProtectedRoute allowedRoles={[3]}>
            <ResOrderList />
          </ProtectedRoute>
        ),
      },

      {
        path: "/UserOrderList",
        element: (
          <ProtectedRoute allowedRoles={[2]}>
            <UserOrderList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);