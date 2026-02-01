import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ClassValue =
  | string
  | number
  | undefined
  | null
  | boolean
  | ClassValue[]
  | Record<string, unknown>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
