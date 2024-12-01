import Navbar from "@/components/shared/navbar";
import { Card } from "@/components/ui/card";
import useInitializeBotpressClient from "@/hooks/use-initialize-botpress-client";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  useInitializeBotpressClient();
  return (
    <div className="bg-neutral-50 h-screen w-full flex flex-col justify-between">
      <Navbar />
      <Card className="w-full rounded-none !h-[calc(100vh-var(--navbar-height))] overflow-hidden">
        <Outlet />
      </Card>
    </div>
  );
};

export default DashboardLayout;
