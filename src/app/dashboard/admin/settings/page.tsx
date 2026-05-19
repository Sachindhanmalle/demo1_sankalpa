"use client";

import { Bell, Shield, Database, Mail } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";

export default function AdminSettingsPage() {
  const { user } = useAuth();

  return (
    <DashboardShell role="admin">
      <div className="space-y-8 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your institution portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> College Profile
            </CardTitle>
            <CardDescription>Basic institution information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">College Name</label>
              <Input defaultValue="SANKALPA PU COLLEGE" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Tagline</label>
              <Input defaultValue="Smart Education Powered by AI" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Admin Email</label>
              <Input defaultValue={user?.email || "admin@sankalpa.edu"} />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notifications
            </CardTitle>
            <CardDescription>Email and alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Exam reminders", "Fee due alerts", "Attendance reports", "AI risk alerts"].map((item) => (
              <label key={item} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm">{item}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-indigo-500" />
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" /> System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Export Reports</p>
                <p className="text-sm text-muted-foreground">Download student data as Excel/PDF</p>
              </div>
              <Button variant="secondary">Export</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email Integration
                </p>
                <p className="text-sm text-muted-foreground">SMTP for OTP and alerts</p>
              </div>
              <Button variant="secondary">Configure</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

