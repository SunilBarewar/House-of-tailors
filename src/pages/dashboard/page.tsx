import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden p-3 gap-2 bg-gray-100">
      <Sidebar />
      <Card className="w-3/4 h-full flex-grow rounded-sm shadow-none">
        Chat Box
      </Card>
    </div>
  );
};

export default DashboardPage;

const Sidebar = () => {
  return (
    <Card className="w-1/4 h-full flex-grow rounded-sm shadow-none">
      Sidebar
    </Card>
  );
};
