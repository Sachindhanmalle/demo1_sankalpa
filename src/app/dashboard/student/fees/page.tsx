"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { api, Payment } from "@/lib/api";

export default function FeesPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    api.payments().then((d) => {
      setPayments(Array.isArray(d) ? d : (d as { results?: Payment[] }).results ?? []);
    }).catch(() => setPayments([]));
  }, []);

  const p = payments[0];

  return (
    <DashboardShell role="student">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Fee Status</h1>
        <Card className="p-6">
          {p ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-muted-foreground text-sm">Total Due</p>
                  <p className="text-3xl font-bold">₹{p.amount_due}</p>
                </div>
                <Badge variant={p.status === "paid" ? "success" : p.status === "partial" ? "warning" : "destructive"}>
                  {p.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Paid: ₹{p.amount_paid} · Balance: ₹{p.balance}</p>
              <Progress value={(Number(p.amount_paid) / Number(p.amount_due)) * 100} />
              <p className="text-xs text-muted-foreground mt-4">Due date: {p.due_date}</p>
            </>
          ) : (
            <p className="text-muted-foreground">Tuition: ₹45,000 · Paid: ₹40,000 · Status: Partial</p>
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}
