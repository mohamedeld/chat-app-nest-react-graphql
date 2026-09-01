import { createBrowserRouter, Outlet } from "react-router";
import App from "./App.tsx";
import { LoginForm } from "./components/forms/login-form.tsx";
import { SignupForm } from "./components/forms/signup-form.tsx";
import { Guard } from "./components/Guard.tsx";
import { MainLayout } from "./components/main-layout.tsx";

export const router = createBrowserRouter([
  {
    element: (
      <Guard>
        <Outlet />
      </Guard>
    ), // Wrap all child routes
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <App />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
    ],
  },
]);
