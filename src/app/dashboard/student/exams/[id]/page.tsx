"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { api, Question, MockTest } from "@/lib/api";

export default function ExamPage() {
  const { id } = useParams();
  const router = useRouter();
  const testId = Number(id);

  const [test, setTest] = useState<MockTest | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { selected: string; review: boolean }>>({});
  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score?: number; percentage?: number } | null>(null);

  useEffect(() => {
    api.mockTest(testId).then((t) => {
      setTest(t);
      setSecondsLeft(t.duration_minutes * 60);
    }).catch(() => {});
    api.startExam(testId).catch(() => {});
    api.examQuestions(testId).then(setQuestions).catch(() => setQuestions([]));
  }, [testId]);

  const submitExam = useCallback(async () => {
    if (submitting || result) return;
    setSubmitting(true);
    try {
      const payload = Object.entries(answers).map(([qId, a]) => ({
        question_id: Number(qId),
        selected_answer: a.selected,
        marked_for_review: a.review,
      }));
      const res = await api.submitExam(testId, payload) as { score?: number; percentage?: number };
      setResult(res);
    } catch {
      setResult({ score: 0, percentage: 0 });
    } finally {
      setSubmitting(false);
    }
  }, [answers, testId, submitting, result]);

  useEffect(() => {
    if (result || !test) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [test, result, submitExam]);

  const q = questions[current];
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  if (result) {
    return (
      <motion.div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Exam Submitted!</h1>
          <p className="text-4xl font-bold gradient-text mt-4">{result.percentage ?? 0}%</p>
          <p className="text-muted-foreground mt-2">Score: {result.score ?? 0} marks</p>
          <Button className="mt-8 w-full" onClick={() => router.push("/dashboard/student/exams")}>
            Back to Tests
          </Button>
        </Card>
      </motion.div>
    );
  }

  if (!q) {
    return <motion.div className="min-h-screen gradient-bg flex items-center justify-center">Loading exam...</motion.div>;
  }

  const selectAnswer = (optId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { selected: optId, review: prev[q.id]?.review ?? false },
    }));
  };

  const toggleReview = () => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { selected: prev[q.id]?.selected ?? "", review: !prev[q.id]?.review },
    }));
  };

  return (
    <motion.div className="min-h-screen gradient-bg">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl px-4 py-3">
        <motion.div className="mx-auto max-w-4xl flex items-center justify-between">
          <motion.div>
            <p className="font-semibold">{test?.title}</p>
            <p className="text-xs text-muted-foreground">Question {current + 1} of {questions.length}</p>
          </motion.div>
          <motion.div className="flex items-center gap-2 font-mono text-lg text-amber-400">
            <Clock className="h-5 w-5" />
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </motion.div>
          <Button variant="destructive" size="sm" onClick={submitExam} disabled={submitting}>
            Submit
          </Button>
        </motion.div>
      </header>

      <main className="mx-auto max-w-4xl p-4 lg:p-8">
        <Card className="p-8">
          <Badge className="mb-4">{q.topic || q.difficulty}</Badge>
          <p className="text-lg font-medium mb-8">{q.text}</p>
          <motion.div className="grid gap-3">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => selectAnswer(opt.id)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  answers[q.id]?.selected === opt.id
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-white/10 hover:border-indigo-500/50"
                }`}
              >
                <span className="text-sm text-muted-foreground mr-2 uppercase">{opt.id}.</span>
                {opt.text}
              </button>
            ))}
          </motion.div>
          <motion.div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={toggleReview}>
              <Flag className="h-4 w-4 mr-2" />
              {answers[q.id]?.review ? "Unmark Review" : "Mark for Review"}
            </Button>
          </motion.div>
        </Card>

        <motion.div className="mt-6 flex justify-between">
          <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          {current < questions.length - 1 ? (
            <Button onClick={() => setCurrent((c) => c + 1)}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submitExam} disabled={submitting}>Submit Exam</Button>
          )}
        </motion.div>

        <motion.div className="mt-8 flex flex-wrap gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-8 w-8 rounded-lg text-xs font-medium ${
                i === current ? "bg-indigo-500 text-white" :
                answers[questions[i].id]?.selected ? "bg-emerald-500/30 text-emerald-300" :
                answers[questions[i].id]?.review ? "bg-amber-500/30 text-amber-300" :
                "bg-white/10"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
}
