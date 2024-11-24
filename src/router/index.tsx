import DashboardLayout from "@/components/layout/DashboardLayout";
import { pathNames } from "@/constants/pathname";
import AppointmentsPage from "@/pages/appointment/page";
import ConversationPage from "@/pages/conversation/page";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import AuthPage from "@/pages/auth/page";
import AppLayout from "@/pages/Layout";

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route element={<DashboardLayout />}>
      <Route
        index
        element={<Navigate replace to={pathNames.CONVERSATIONS} />}
      />
      <Route path={pathNames.CONVERSATIONS} element={<ConversationPage />} />
      <Route path={pathNames.APPOINTMENTS} element={<AppointmentsPage />} />
    </Route>

    <Route path={pathNames.LOGIN} element={<AuthPage />} />
  </Route>
);

export const router = createBrowserRouter(routes);
