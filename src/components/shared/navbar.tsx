import { Button } from "../ui/button";
import { Card } from "../ui/card";
import AppSidebar from "./sidebar";

const Navbar = () => {
  return (
    <Card className="flex w-full justify-between py-2 px-3 rounded-none shadow-none border-none border-b border-solid border-gray-200 h-navbar">
      <div className="flex gap-3 items-center">
        <AppSidebar />
        <h1 className="font-ga-maamli text-xl">House of Tailors</h1>
      </div>

      <div>
        <Button className="bg-red-500">Logout</Button>
      </div>
    </Card>
  );
};

export default Navbar;
