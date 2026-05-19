"use client";

import { useEffect } from "react";
import { Users, BookOpen, Wallet, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const stats = [
  { label: "Total Students", value: "2,547", icon: Users, color: "text-indigo-400" },
  { label: "Active Tests", value: "24", icon: BookOpen, color: "text-violet-400" },
  { label: "Fees Collected", value: "Rs 1.2Cr", icon: Wallet, color: "text-emerald-400" },
  { label: "Avg Performance", value: "76.3%", icon: TrendingUp, color: "text-amber-400" },
];

const chartData = [
  { month: "Jan", students: 400 }, { month: "Feb", students: 520 },
  { month: "Mar", students: 680 }, { month: "Apr", students: 890 },
];

export default function AdminDashboard() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/login?role=admin");
    if (!loading && user && !["admin", "super_admin"].includes(user.role)) {
      router.push("/dashboard/student");
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) return <div className="min-h-screen gradient-bg" />;

  return (
    <DashboardShell role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Sankalpa PU College â€” Institution Overview</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                </div>
                <s.icon className={`h-8 w-8 ${s.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <CardHeader className="p-0 mb-4"><CardTitle>Enrollment Growth</CardTitle></CardHeader>
            <CardContent className="p-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                  <Bar dataKey="students" fill="#818cf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardTitle className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" /> Alerts
            </CardTitle>
            <div className="space-y-3">
              {["12 students at dropout risk", "Fee overdue: 45 students", "Physics mock test pending review"].map((a) => (
                <div key={a} className="glass rounded-xl p-3 text-sm">{a}</div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

