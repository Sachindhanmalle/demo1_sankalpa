"use client";

import { useEffect, useState } from "react";
import { Clock, FileQuestion, Plus, Eye } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api, MockTest } from "@/lib/api";

export default function AdminTestsPage() {
  const [tests, setTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .mockTests()
      .then(setTests)
      .catch(() => setTests([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardShell role="admin">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Mock Test Management</h1>
            <p className="text-muted-foreground">Create and manage online exams</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Test
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading tests...</p>
        ) : tests.length === 0 ? (
          <Card className="p-12 text-center text-muted-foreground">
            No mock tests yet. Run backend seed_data or create a new test.
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <Card key={test.id} className="p-6 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge>{test.test_type.toUpperCase()}</Badge>
                  <Badge variant={test.is_published ? "success" : "warning"}>
                    {test.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg">{test.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-1">
                  {test.description || "No description"}
                </p>
                <div className="mt-4 flex gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {test.duration_minutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <FileQuestion className="h-4 w-4" /> {test.question_count ?? "â€”"} Qs
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1 gap-1">
                    <Eye className="h-4 w-4" /> View
                  </Button>
                  <Button size="sm" className="flex-1">Edit</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}


