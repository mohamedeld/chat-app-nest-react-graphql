import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import { LoginForm } from "./components/forms/login-form.tsx";
import { SignupForm } from "./components/forms/signup-form.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/login", element: <LoginForm /> },
  { path: "/signup", element: <SignupForm /> },
]);
