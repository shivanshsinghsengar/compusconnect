"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  Briefcase,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Notes",
    icon: BookOpen,
    href: "/notes",
    color: "text-mint",
  },
  {
    label: "Placements",
    icon: Briefcase,
    href: "/placements",
    color: "text-peach",
  },
  {
    label: "Anonymous Board",
    icon: MessageSquare,
    href: "/anonymous",
    color: "text-softPurple",
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
    color: "text-skyBlue",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-lavender text-foreground">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative">
            <h1 className="text-2xl font-bold text-softPurple">
              CampusConnect
            </h1>
            <p className="text-xs text-muted-foreground">
              Notes • Placements • Support
            </p>
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/50 rounded-lg transition",
                pathname === route.href
                  ? "bg-white shadow-sm"
                  : "text-zinc-600"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start text-zinc-600 hover:bg-white/50"
        >
          <LogOut className="h-5 w-5 mr-3 text-red-500" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
