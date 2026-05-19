"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, FileQuestion, Trophy } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api, MockTest } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function ExamsPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [tests, setTests] = useState<MockTest[]>([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/login?role=student");
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      api.mockTests().then(setTests).catch(() => setTests([]));
    }
  }, [isAuthenticated]);

  if (loading) return <motion.div className="min-h-screen gradient-bg" />;

  return (
    <DashboardShell role="student">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <motion.div>
          <h1 className="text-2xl font-bold">Mock Tests</h1>
          <p className="text-muted-foreground">Practice with timer-based online exams</p>
        </motion.div>

        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <Badge className="w-fit mb-3">{test.test_type.toUpperCase()}</Badge>
                <h3 className="text-lg font-bold">{test.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-1">{test.description || "Full syllabus test"}</p>
                <motion.div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {test.duration_minutes} min</span>
                  <span className="flex items-center gap-1"><FileQuestion className="h-4 w-4" /> {test.question_count ?? "—"} Qs</span>
                  {test.negative_marking && <Badge variant="warning">-ve marking</Badge>}
                </motion.div>
                <Link href={`/dashboard/student/exams/${test.id}`} className="mt-6">
                  <Button className="w-full">Start Exam</Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {tests.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No tests available. Start the backend and run seed_data.</p>
          </Card>
        )}

        <Card className="p-6 flex items-center gap-4">
          <Trophy className="h-10 w-10 text-amber-400" />
          <motion.div>
            <p className="font-semibold">Leaderboard</p>
            <p className="text-sm text-muted-foreground">Compete with classmates after each test</p>
          </motion.div>
        </Card>
      </motion.div>
    </DashboardShell>
  );
}
