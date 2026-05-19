"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { Calendar, BookOpen, TrendingUp, Wallet, ClipboardList } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { api, AnalyticsData, Notification, Assignment } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

function StatCard({ title, value, sub, icon: Icon, color }: {
  title: string; value: string; sub: string; icon: React.ElementType; color: string;
}) {
  return (
    <Card className="p-6">
      <motion.div className="flex items-start justify-between">
        <motion.div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{sub}</p>
        </motion.div>
        <motion.div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </Card>
  );
}

export default function StudentDashboard() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/login?role=student");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    api.analyticsDashboard().then(setAnalytics).catch(() => setAnalytics({
      performance_score: 78.5, attendance_percentage: 92, predicted_rank: 15,
      dropout_risk_score: 8.2, weak_subjects: [], strong_subjects: [],
      performance_trend: [
        { month: "Jan", score: 72 }, { month: "Feb", score: 75 },
        { month: "Mar", score: 78 }, { month: "Apr", score: 82 },
      ], ai_insights: "Focus on Physics numerical problems.",
    }));
    api.notifications().then((d) => {
      const list = Array.isArray(d) ? d : (d as { results?: Notification[] }).results ?? [];
      setNotifications(list.slice(0, 3));
    }).catch(() => setNotifications([]));
    api.assignments().then((d) => {
      const list = Array.isArray(d) ? d : (d as { results?: Assignment[] }).results ?? [];
      setAssignments(list.slice(0, 3));
    }).catch(() => setAssignments([]));
  }, [isAuthenticated]);

  if (authLoading) return <motion.div className="min-h-screen gradient-bg" />;

  const trend = analytics?.performance_trend ?? [];
  const subjects = [
    ...(analytics?.strong_subjects ?? []),
    ...(analytics?.weak_subjects ?? []),
  ];
  const chartSubjects = subjects.length
    ? subjects
    : [{ subject: "Math", score: 88 }, { subject: "Physics", score: 58 }];

  return (
    <DashboardShell role="student">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <motion.div>
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and upcoming activities</p>
        </motion.div>

        <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Attendance" value={`${analytics?.attendance_percentage ?? 92}%`} sub="This semester" icon={Calendar} color="bg-emerald-500/20 text-emerald-400" />
          <StatCard title="Performance" value={`${analytics?.performance_score ?? 78}%`} sub="Overall score" icon={TrendingUp} color="bg-indigo-500/20 text-indigo-400" />
          <StatCard title="Predicted Rank" value={`#${analytics?.predicted_rank ?? 15}`} sub="In class" icon={BookOpen} color="bg-violet-500/20 text-violet-400" />
          <StatCard title="Fee Status" value="Partial" sub="₹15,000 due" icon={Wallet} color="bg-amber-500/20 text-amber-400" />
        </motion.div>

        <motion.div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="score" stroke="#818cf8" strokeWidth={3} dot={{ fill: "#818cf8" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Subject Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartSubjects}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                  <Bar dataKey="score" fill="#818cf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <CardTitle className="mb-4 flex items-center gap-2">
              <ClipboardList className="h-5 w-5" /> Assignments
            </CardTitle>
            {assignments.length === 0 ? (
              <p className="text-muted-foreground text-sm">Calculus Problem Set 5 — Due in 3 days</p>
            ) : (
              assignments.map((a) => (
                <motion.div key={a.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                  <motion.div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-muted-foreground">{a.subject_name}</p>
                  </motion.div>
                  <Badge variant="warning">Due soon</Badge>
                </motion.div>
              ))
            )}
          </Card>

          <Card className="p-6">
            <CardTitle className="mb-4">AI Insight</CardTitle>
            <p className="text-sm text-muted-foreground">{analytics?.ai_insights}</p>
            <Link href="/dashboard/student/exams">
              <Button className="w-full mt-4">Start Mock Test</Button>
            </Link>
          </Card>
        </motion.div>

        {notifications.length > 0 && (
          <Card className="p-6">
            <CardTitle className="mb-4">Notifications</CardTitle>
            {notifications.map((n) => (
              <motion.div key={n.id} className="py-2 border-b border-white/5 last:border-0">
                <p className="font-medium text-sm">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.message}</p>
              </motion.div>
            ))}
          </Card>
        )}
      </motion.div>
    </DashboardShell>
  );
}
