"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api, AnalyticsData } from "@/lib/api";

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    api.analyticsDashboard().then(setData).catch(() => {});
  }, []);

  const weak = data?.weak_subjects ?? [{ subject: "Physics", score: 58 }, { subject: "Chemistry", score: 62 }];
  const strong = data?.strong_subjects ?? [{ subject: "Mathematics", score: 88 }];

  return (
    <DashboardShell role="student">
      <motion.div className="space-y-8">
        <h1 className="text-2xl font-bold">AI Analytics</h1>
        <motion.div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <CardTitle className="mb-4 text-red-400">Weak Subjects</CardTitle>
            {weak.map((s) => (
              <motion.div key={s.subject} className="mb-4">
                <motion.div className="flex justify-between text-sm mb-1"><span>{s.subject}</span><span>{s.score}%</span></motion.div>
                <Progress value={s.score} />
              </motion.div>
            ))}
          </Card>
          <Card className="p-6">
            <CardTitle className="mb-4 text-emerald-400">Strong Subjects</CardTitle>
            {strong.map((s) => (
              <motion.div key={s.subject} className="mb-4">
                <motion.div className="flex justify-between text-sm mb-1"><span>{s.subject}</span><span>{s.score}%</span></motion.div>
                <Progress value={s.score} />
              </motion.div>
            ))}
          </Card>
        </motion.div>
        <Card className="p-6">
          <p className="text-muted-foreground">{data?.ai_insights}</p>
        </Card>
      </motion.div>
    </DashboardShell>
  );
}
