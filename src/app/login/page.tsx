"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";

function LoginForm() {
  const params = useSearchParams();
  const role = params.get("role") || "student";
  const { login } = useAuth();
  const [username, setUsername] = useState(role === "admin" ? "admin" : "student1");
  const [password, setPassword] = useState(role === "admin" ? "admin123" : "student123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Login failed. Is the backend running?";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 hero-glow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <motion.div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
            <GraduationCap className="h-6 w-6 text-white" />
          </motion.div>
          <span className="text-xl font-bold">SANKALPA PU COLLEGE</span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>{role === "admin" ? "Admin Login" : "Student Login"}</CardTitle>
            <CardDescription>Smart Education Powered by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div>
                <label className="text-sm text-muted-foreground mb-1 block">Username</label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
              </motion.div>
              <motion.div>
                <label className="text-sm text-muted-foreground mb-1 block">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </motion.div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Demo: {role === "admin" ? "admin / admin123" : "student1 / student123"}
            </p>
            <motion.div className="mt-4 flex justify-center gap-4 text-sm">
              <Link href="/login?role=student" className="text-indigo-400 hover:underline">Student</Link>
              <Link href="/login?role=admin" className="text-indigo-400 hover:underline">Admin</Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen gradient-bg" />}>
      <LoginForm />
    </Suspense>
  );
}
