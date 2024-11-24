import { localStorageKeys } from "@/constants/local-storage-keys";
import { getLocalStorageItem, logError } from "@/lib/utils";
import { useAuthStore } from "@/stores";
import { IAuthDataSchema } from "@/types/user.types";
import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const login = useAuthStore((state) => state.login);

  useLayoutEffect(() => {
    const user = getLocalStorageItem(localStorageKeys.USER_DETAILS);

    if (user) {
      try {
        const validatedUser = IAuthDataSchema.parse({
          ...user,
          loggedInAt: new Date(user.loggedInAt),
        });
        login(validatedUser);
      } catch (error: unknown) {
        logError(error);
      }
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;
