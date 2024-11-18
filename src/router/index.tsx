import ConversationPage from "@/pages/conversation/page";
import AppointmentsPage from "@/pages/appointment/page";
import {
  createRoutesFromElements,
  Navigate,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import { pathNames } from "@/constants/pathname";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const routes = createRoutesFromElements(
  <Route path="/">
    <Route element={<DashboardLayout />}>
      <Route
        index
        element={<Navigate replace to={pathNames.CONVERSATIONS} />}
      />
      <Route path={pathNames.CONVERSATIONS} element={<ConversationPage />} />
      <Route path={pathNames.APPOINTMENTS} element={<AppointmentsPage />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
