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
import RequireAuth from "./gaurds/RequireAuth";
import PublicGaurd from "./gaurds/PublicGaurd";

export const routes = createRoutesFromElements(
  <Route path="/">
    <Route element={<PublicGaurd />}>
      <Route path={pathNames.LOGIN} element={<AuthPage />} />
    </Route>

    <Route element={<RequireAuth />}>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to={pathNames.CONVERSATIONS} />} />
        <Route path={pathNames.CONVERSATIONS} element={<ConversationPage />} />
        <Route path={pathNames.APPOINTMENTS} element={<AppointmentsPage />} />
      </Route>
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
