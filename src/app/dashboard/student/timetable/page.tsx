"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { api, TimetableEntry } from "@/lib/api";

const days = ["mon", "tue", "wed", "thu", "fri", "sat"];

export default function TimetablePage() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);

  useEffect(() => {
    api.timetable().then((d) => {
      setEntries(Array.isArray(d) ? d : (d as { results?: TimetableEntry[] }).results ?? []);
    }).catch(() => setEntries([]));
  }, []);

  return (
    <DashboardShell role="student">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Timetable</h1>
        <div className="grid gap-4">
          {days.map((day) => {
            const dayEntries = entries.filter((e) => e.day === day);
            return (
              <Card key={day} className="p-4">
                <p className="font-semibold capitalize mb-3">{day}</p>
                {dayEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No classes</p>
                ) : (
                  dayEntries.map((e) => (
                    <div key={e.id} className="flex justify-between py-2 border-b border-white/5 last:border-0 text-sm">
                      <span>{e.subject_name}</span>
                      <span className="text-muted-foreground">{e.start_time?.slice(0, 5)} - {e.end_time?.slice(0, 5)} · {e.room}</span>
                    </div>
                  ))
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
