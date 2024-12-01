import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { localStorageKeys } from "@/constants/local-storage-keys";
import { pathNames } from "@/constants/pathname";
import { matchEmailAndPassword } from "@/lib/auth";
import { setLocalStorageItem } from "@/lib/utils";
import { useAuthStore } from "@/stores";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!email || !password) {
      return toast.error("Please enter email and password");
    }

    if (!matchEmailAndPassword(email, password)) {
      return toast.error("Invalid email or password");
    }
    const authData = {
      email,
      loggedInAt: new Date(),
      isAuthenticated: true,
    };
    login(authData);
    navigate(pathNames.CONVERSATIONS);
    setLocalStorageItem(localStorageKeys.USER_DETAILS, authData);
    toast.success("Logged in successfully");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
