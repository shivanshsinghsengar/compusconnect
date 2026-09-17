import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    Mathematics: "border-l-skyBlue",
    Physics: "border-l-mint",
    Chemistry: "border-l-peach",
    "Computer Science": "border-l-softPurple",
    Engineering: "border-l-blue-400",
    Biology: "border-l-green-400",
    Economics: "border-l-yellow-400",
    Default: "border-l-gray-400",
  };

  return colors[subject] || colors.Default;
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    Easy: "text-green-600 bg-green-100",
    Medium: "text-yellow-600 bg-yellow-100",
    Hard: "text-red-600 bg-red-100",
  };

  return colors[difficulty] || colors.Medium;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    Applied: "text-blue-600 bg-blue-100",
    OA: "text-purple-600 bg-purple-100",
    Interview: "text-orange-600 bg-orange-100",
    Offer: "text-green-600 bg-green-100",
    Rejected: "text-red-600 bg-red-100",
  };

  return colors[status] || colors.Applied;
}
