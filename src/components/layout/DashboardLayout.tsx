import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Card } from "../ui/card";

const DashboardLayout = () => {
  return (
    <div className="bg-neutral-50 h-screen w-full flex flex-col justify-between">
      <Navbar />
      <Card className="w-full rounded-none !h-[calc(100vh-var(--navbar-height)-8px)] overflow-hidden">
        <Outlet />
      </Card>
    </div>
  );
};

export default DashboardLayout;
