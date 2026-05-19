"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain, BarChart3, ClipboardCheck, Users, Wallet, FileText,
  Clock, Shield, Sparkles, Star, Check, Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 hero-glow gradient-bg overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
      />

      <motion.div {...fadeUp} className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <Badge className="mb-6">AI-Powered Education Platform</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="gradient-text">SANKALPA PU COLLEGE</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
          Smart Education Powered by AI
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Premium ERP + Online Mock Tests. Attendance, analytics, fees, and exams — all in one beautiful platform built for modern colleges.
        </p>
        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/login?role=student"><Button size="lg">Student Login</Button></Link>
          <Link href="/login?role=admin"><Button variant="secondary" size="lg">Admin Login</Button></Link>
          <Link href="#pricing"><Button variant="outline" size="lg">Book Demo</Button></Link>
          <Link href="/login?role=student"><Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 from-emerald-600 to-teal-600">Start Mock Test</Button></Link>
        </motion.div>
        <motion.div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Students", value: "2,500+" },
            { label: "Mock Tests", value: "150+" },
            { label: "Teachers", value: "80+" },
            { label: "Success Rate", value: "94%" },
          ].map((s) => (
            <motion.div key={s.label} className="glass rounded-2xl p-4">
              <p className="text-2xl font-bold gradient-text">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

const features = [
  { icon: ClipboardCheck, title: "Smart Attendance", desc: "AI-tracked attendance with instant parent alerts." },
  { icon: Brain, title: "AI Analytics", desc: "Predict performance, weak subjects, and dropout risk." },
  { icon: FileText, title: "Online Exams", desc: "MCQ & coding tests with timer, negative marking." },
  { icon: Users, title: "Student Dashboard", desc: "Beautiful hub for scores, timetable, and assignments." },
  { icon: Wallet, title: "Fee Management", desc: "Track payments, dues, and generate receipts." },
  { icon: BarChart3, title: "Performance Reports", desc: "Export PDF/Excel reports with deep insights." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4">
      <motion.div {...fadeUp} className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Everything your college needs</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Enterprise-grade tools with startup-quality design.</p>
        <motion.div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
              <Card className="h-full text-left p-6 hover:scale-[1.02] transition-transform">
                <motion.div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20">
                  <f.icon className="h-6 w-6 text-indigo-400" />
                </motion.div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export function MockTestSection() {
  return (
    <section id="mock-test" className="py-24 px-4 bg-accent/30">
      <motion.div {...fadeUp} className="mx-auto max-w-7xl">
        <motion.div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Online Mock Test Preview</h2>
          <p className="mt-4 text-muted-foreground">Timer-based exams with instant results & leaderboard</p>
        </motion.div>
        <Card className="overflow-hidden border-indigo-500/20">
          <motion.div className="flex items-center justify-between border-b border-white/10 bg-indigo-950/50 px-6 py-4">
            <motion.div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="font-mono text-lg font-bold text-amber-400">45:32</span>
            </motion.div>
            <Badge variant="warning">Question 12 / 25</Badge>
            <motion.div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" /> Full Screen Mode
            </motion.div>
          </motion.div>
          <CardContent className="p-8">
            <p className="text-lg font-medium mb-6">What is the SI unit of force?</p>
            <motion.div className="grid gap-3 sm:grid-cols-2">
              {["Newton", "Joule", "Watt", "Pascal"].map((opt, i) => (
                <motion.button
                  key={opt}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    i === 0 ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 hover:border-indigo-500/50"
                  }`}
                >
                  <span className="text-sm text-muted-foreground mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </motion.div>
            <motion.div className="mt-8 flex gap-3">
              <Button variant="secondary">Mark for Review</Button>
              <Button>Save & Next</Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

export function AnalyticsSection() {
  const data = [
    { subject: "Physics", score: 58 },
    { subject: "Chemistry", score: 62 },
    { subject: "Math", score: 88 },
    { subject: "Biology", score: 85 },
  ];
  return (
    <section id="analytics" className="py-24 px-4">
      <motion.div {...fadeUp} className="mx-auto max-w-7xl">
        <motion.div className="text-center mb-12">
          <Sparkles className="h-8 w-8 text-violet-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">AI Analytics Dashboard</h2>
          <p className="mt-4 text-muted-foreground">Predictive insights powered by machine learning</p>
        </motion.div>
        <motion.div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <CardTitle className="mb-4">Subject Performance</CardTitle>
            {data.map((d) => (
              <motion.div key={d.subject} className="mb-4">
                <motion.div className="flex justify-between text-sm mb-1">
                  <span>{d.subject}</span>
                  <span className={d.score < 65 ? "text-red-400" : "text-emerald-400"}>{d.score}%</span>
                </motion.div>
                <Progress value={d.score} />
              </motion.div>
            ))}
          </Card>
          <Card className="p-6">
            <CardTitle className="mb-4">AI Predictions</CardTitle>
            <motion.div className="space-y-4">
              {[
                { label: "Predicted Rank", value: "#15", color: "text-indigo-400" },
                { label: "Attendance", value: "92%", color: "text-emerald-400" },
                { label: "Dropout Risk", value: "Low (8%)", color: "text-emerald-400" },
                { label: "Weak Topic", value: "Physics - Mechanics", color: "text-amber-400" },
              ].map((item) => (
                <motion.div key={item.label} className="flex justify-between items-center glass rounded-xl p-4">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function TestimonialsSection() {
  const items = [
    { name: "Dr. Ramesh K.", role: "Principal", text: "Sankalpa ERP transformed how we manage academics. Parents love the real-time updates." },
    { name: "Ananya P.", role: "Student, II PUC", text: "Mock tests feel like the real JEE. AI analytics showed exactly where I needed to improve." },
    { name: "Suresh M.", role: "Parent", text: "Fee tracking and attendance alerts give us complete peace of mind." },
  ];
  return (
    <section className="py-24 px-4 bg-accent/30">
      <motion.div {...fadeUp} className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by educators & families</h2>
        <motion.div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <Card key={t.name} className="p-6">
              <motion.div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </motion.div>
              <p className="text-muted-foreground mb-4">&ldquo;{t.text}&rdquo;</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export function PricingSection() {
  const plans = [
    { name: "Starter", price: "₹49,999", features: ["Up to 500 students", "Basic ERP", "5 Mock Tests/mo"], popular: false },
    { name: "Professional", price: "₹99,999", features: ["Up to 2000 students", "Full ERP + AI", "Unlimited Mock Tests", "Priority Support"], popular: true },
    { name: "Enterprise", price: "Custom", features: ["Unlimited students", "Custom integrations", "Dedicated manager", "On-premise option"], popular: false },
  ];
  return (
    <section id="pricing" className="py-24 px-4">
      <motion.div {...fadeUp} className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-4">Simple, transparent pricing</h2>
        <p className="text-center text-muted-foreground mb-12">Choose the plan that fits your institution</p>
        <motion.div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.name} className={`p-8 relative ${p.popular ? "border-indigo-500 ring-2 ring-indigo-500/20 scale-105" : ""}`}>
              {p.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
              <CardTitle>{p.name}</CardTitle>
              <p className="mt-4 text-3xl font-bold gradient-text">{p.price}<span className="text-sm text-muted-foreground font-normal">/year</span></p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8" variant={p.popular ? "default" : "secondary"}>Get Started</Button>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 py-12 px-4">
      <motion.div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div>
          <p className="font-bold text-lg">SANKALPA PU COLLEGE</p>
          <p className="text-sm text-muted-foreground mt-1">Smart Education Powered by AI</p>
        </motion.div>
        <motion.div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <Link href="/login">Login</Link>
        </motion.div>
        <p className="text-sm text-muted-foreground">© 2026 Sankalpa PU College. All rights reserved.</p>
      </motion.div>
    </footer>
  );
}

export function ChatbotFab() {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/40"
      title="AI Assistant"
    >
      <Brain className="h-6 w-6 text-white" />
    </motion.button>
  );
}
