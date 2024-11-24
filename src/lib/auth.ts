import { ENV_KEYS } from "@/constants/env-keys";
import { getEnvValue } from "./utils";

export const matchEmailAndPassword = (email: string, password: string) => {
  return (
    email === getEnvValue(ENV_KEYS.ADMIN_EMAIL) &&
    password === getEnvValue(ENV_KEYS.MASTER_PASSWORD)
  );
};
