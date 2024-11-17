import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar";

const DashboardLayout = () => {
  return (
    <div className="bg-neutral-50 h-screen w-full flex flex-col justify-between">
      <Navbar />
      <div className="w-full !h-[calc(100vh-var(--navbar-height)-8px)] overflow-hidden border border-red-500 px-3 p">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
