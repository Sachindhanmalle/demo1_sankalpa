"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, AlertTriangle, Award } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, AdminAnalytics } from "@/lib/api";

const enrollmentData = [
  { month: "Jan", students: 400 },
  { month: "Feb", students: 520 },
  { month: "Mar", students: 680 },
  { month: "Apr", students: 890 },
];

const performanceData = [
  { subject: "Physics", avg: 62 },
  { subject: "Chemistry", avg: 68 },
  { subject: "Math", avg: 81 },
  { subject: "Biology", avg: 75 },
];

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AdminAnalytics | null>(null);

  useEffect(() => {
    api.adminAnalytics().then(setStats).catch(() =>
      setStats({
        total_students: 450,
        avg_performance: 76.3,
        avg_attendance: 89.5,
        high_risk_students: 12,
        top_performers: 45,
      })
    );
  }, []);

  const cards = [
    { label: "Total Students", value: stats?.total_students ?? 0, icon: Users, color: "text-indigo-400" },
    { label: "Avg Performance", value: `${stats?.avg_performance ?? 0}%`, icon: TrendingUp, color: "text-emerald-400" },
    { label: "High Risk", value: stats?.high_risk_students ?? 0, icon: AlertTriangle, color: "text-amber-400" },
    { label: "Top Performers", value: stats?.top_performers ?? 0, icon: Award, color: "text-violet-400" },
  ];

  return (
    <DashboardShell role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Institution Analytics</h1>
          <p className="text-muted-foreground">AI-powered insights across all students</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Card key={c.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="text-2xl font-bold mt-1">{c.value}</p>
                </div>
                <c.icon className={`h-8 w-8 ${c.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Enrollment Growth</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="students" stroke="#818cf8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Average Score by Subject</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }} />
                  <Bar dataKey="avg" fill="#818cf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="p-6">
          <CardTitle className="mb-4">AI Recommendations</CardTitle>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>- 12 students flagged for dropout risk - schedule counseling sessions</li>
            <li>- Physics scores dropped 8% this month - consider extra mock tests</li>
            <li>- Fee collection at 73% - send reminders to 45 overdue accounts</li>
          </ul>
        </Card>
      </div>
    </DashboardShell>
  );
}

