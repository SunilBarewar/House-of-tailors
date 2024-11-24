import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logError(error: unknown) {
  if (import.meta.env.DEV) {
    console.error(error);
  }
}

export function getEnvValue(key: string) {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
}

export function setLocalStorageItem(key: string, data: unknown) {
  console.log("setLocalStorageItem", key, data);
  const value = JSON.stringify(data);
  localStorage?.setItem(key, value);
}

export function getLocalStorageItem(key: string) {
  const value = localStorage?.getItem(key);
  return value ? JSON.parse(value) : null;
}
