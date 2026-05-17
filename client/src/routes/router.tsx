import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { DashboardPage } from "@/pages/dashboard.page";
import { ForbiddenPage } from "@/pages/forbidden.page";
import { HomePage } from "@/pages/home.page";
import { NotFoundPage } from "@/pages/not-found.page";
import { LoginPage } from "@/pages/auth/login.page";
import { RegisterPage } from "@/pages/auth/register.page";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: ROUTES.FORBIDDEN,
    element: <ForbiddenPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
