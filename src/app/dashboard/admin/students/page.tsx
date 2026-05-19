"use client";

import { useEffect, useState } from "react";
import { Search, UserPlus, Mail } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, User } from "@/lib/api";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .users("student")
      .then(setStudents)
      .catch(() =>
        setStudents([
          {
            id: 1,
            username: "student1",
            email: "student@sankalpa.edu",
            first_name: "Priya",
            last_name: "Sharma",
            role: "student",
            is_verified: true,
          },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter(
    (s) =>
      s.username.toLowerCase().includes(search.toLowerCase()) ||
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell role="admin">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Student Management</h1>
            <p className="text-muted-foreground">Manage enrolled students</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Add Student
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading students...</p>
        ) : filtered.length === 0 ? (
          <Card className="p-12 text-center text-muted-foreground">No students found</Card>
        ) : (
          <div className="grid gap-4">
            {filtered.map((student) => (
              <Card key={student.id} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                      {(student.first_name?.[0] || student.username[0]).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {student.first_name} {student.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">@{student.username}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="h-4 w-4" /> {student.email}
                    </span>
                    <Badge variant={student.is_verified ? "success" : "warning"}>
                      {student.is_verified ? "Verified" : "Pending"}
                    </Badge>
                    <Button variant="secondary" size="sm">View Profile</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

