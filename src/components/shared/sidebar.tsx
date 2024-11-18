import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { pathNames } from "@/constants/pathname";
import {
  AlignJustify,
  CalendarFold,
  CircleX,
  MessageSquareMore,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

interface ILink {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const links: ILink[] = [
  {
    title: "Conversations",
    href: pathNames.CONVERSATIONS,
    icon: <MessageSquareMore />,
  },
  {
    title: "Appointments",
    href: pathNames.APPOINTMENTS,
    icon: <CalendarFold />,
  },
];

function AppSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <AlignJustify className="text-2xl" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="text-neutral-900">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetClose asChild>
              <CircleX size={20} color="#1f1f1f" />
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md text-neutral-800"
            >
              <SheetClose asChild>
                <div className="flex items-center gap-3 font-poppins">
                  <span>{link.icon}</span>
                  <span className="font-medium tracking-wide text-neutral-600">
                    {link.title}
                  </span>
                </div>
              </SheetClose>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AppSidebar;
