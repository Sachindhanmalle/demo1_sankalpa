"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, BarChart3, Calendar, Bell,
  CreditCard, LogOut, Menu, X, GraduationCap, Moon, Sun, Users, Settings,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const studentNav = [
  { href: "/dashboard/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/student/exams", label: "Mock Tests", icon: BookOpen },
  { href: "/dashboard/student/analytics", label: "AI Analytics", icon: BarChart3 },
  { href: "/dashboard/student/timetable", label: "Timetable", icon: Calendar },
  { href: "/dashboard/student/fees", label: "Fees", icon: CreditCard },
];

const adminNav = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/students", label: "Students", icon: Users },
  { href: "/dashboard/admin/tests", label: "Mock Tests", icon: BookOpen },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({
  children,
  role = "student",
}: {
  children: React.ReactNode;
  role?: "student" | "admin" | "teacher";
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = role === "admin" ? adminNav : studentNav;

  return (
    <motion.div className="min-h-screen gradient-bg flex">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-background/95 backdrop-blur-xl transition-transform lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <motion.div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <GraduationCap className="h-6 w-6 text-indigo-400" />
          <span className="font-bold text-sm">SANKALPA ERP</span>
        </motion.div>
        <nav className="p-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all",
                  active
                    ? "bg-indigo-500/20 text-indigo-300 font-medium"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <motion.div className="absolute bottom-4 left-4 right-4">
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={logout}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </motion.div>
      </aside>

      {sidebarOpen && (
        <motion.div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <motion.div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-background/80 backdrop-blur-xl px-4 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Welcome back, <span className="text-foreground font-medium">{user?.first_name || user?.username}</span>
          </p>
          <motion.div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <motion.div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white">
              {(user?.first_name?.[0] || user?.username?.[0] || "U").toUpperCase()}
            </motion.div>
          </motion.div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </motion.div>
    </motion.div>
  );
}
