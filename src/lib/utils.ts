import { type ClassValue, clsx } from "clsx";
import { Area } from "react-easy-crop";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// utils/cropImage.ts
