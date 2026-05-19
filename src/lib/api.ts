const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface ApiError {
  message: string;
  status: number;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw { message: err.detail || err.error || "Request failed", status: res.status };
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

export const api = {
  health: () => request<{ status: string }>("/health/"),

  login: (data: { username: string; password: string }) =>
    request<{ tokens: { access: string; refresh: string }; user: User; profile?: unknown }>(
      "/auth/login/",
      { method: "POST", body: JSON.stringify(data) }
    ),

  register: (data: Record<string, string>) =>
    request("/auth/register/", { method: "POST", body: JSON.stringify(data) }),

  me: () => request<{ user: User; profile?: unknown }>("/auth/me/"),

  verifyOtp: (data: { email: string; otp: string }) =>
    request("/auth/verify-otp/", { method: "POST", body: JSON.stringify(data) }),

  forgotPassword: (email: string) =>
    request("/auth/forgot-password/", { method: "POST", body: JSON.stringify({ email }) }),

  attendanceSummary: () =>
    request<{ total: number; present: number; percentage: number }>(
      "/academics/attendance/summary/"
    ),

  mockTests: async () => {
    const data = await request<{ results?: MockTest[] } | MockTest[]>("/mocktests/tests/");
    return Array.isArray(data) ? data : (data.results ?? []);
  },

  mockTest: (id: number) => request<MockTest>(`/mocktests/tests/${id}/`),

  startExam: (id: number) =>
    request(`/mocktests/tests/${id}/start/`, { method: "POST" }),

  examQuestions: (id: number) =>
    request<Question[]>(`/mocktests/tests/${id}/questions/`),

  submitExam: (id: number, answers: ExamAnswer[]) =>
    request(`/mocktests/tests/${id}/submit/`, {
      method: "POST",
      body: JSON.stringify({ answers }),
    }),

  leaderboard: (id: number) =>
    request(`/mocktests/tests/${id}/leaderboard/`),

  analyticsDashboard: () =>
    request<AnalyticsData>("/analytics/student/dashboard/"),

  notifications: () => request<Notification[]>("/notifications/"),

  payments: () => request<Payment[]>("/fees/payments/"),

  timetable: () => request<TimetableEntry[]>("/academics/timetable/"),

  assignments: () => request<Assignment[]>("/academics/assignments/"),

  users: async (role?: string) => {
    const query = role ? `?role=${role}` : "";
    const data = await request<{ results?: User[] } | User[]>(`/auth/users/${query}`);
    return Array.isArray(data) ? data : (data.results ?? []);
  },

  adminAnalytics: () =>
    request<AdminAnalytics>("/analytics/student/dashboard/"),
};

export interface AdminAnalytics {
  total_students?: number;
  avg_performance?: number;
  avg_attendance?: number;
  high_risk_students?: number;
  top_performers?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone?: string;
  is_verified: boolean;
}

export interface MockTest {
  id: number;
  title: string;
  description: string;
  test_type: string;
  duration_minutes: number;
  total_marks: number;
  negative_marking: boolean;
  is_published: boolean;
  question_count?: number;
}

export interface Question {
  id: number;
  question_type: string;
  text: string;
  options: { id: string; text: string }[];
  marks: number;
  difficulty: string;
  topic: string;
  order: number;
}

export interface ExamAnswer {
  question_id: number;
  selected_answer: string;
  marked_for_review?: boolean;
}

export interface AnalyticsData {
  performance_score: number;
  attendance_percentage: number;
  predicted_rank: number;
  dropout_risk_score: number;
  weak_subjects: { subject: string; score: number }[];
  strong_subjects: { subject: string; score: number }[];
  performance_trend: { month: string; score: number }[];
  ai_insights: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  created_at: string;
}

export interface Payment {
  id: number;
  amount_due: string;
  amount_paid: string;
  status: string;
  due_date: string;
  balance: string;
}

export interface TimetableEntry {
  id: number;
  subject_name: string;
  day: string;
  start_time: string;
  end_time: string;
  room: string;
}

export interface Assignment {
  id: number;
  title: string;
  subject_name: string;
  due_date: string;
  max_marks: number;
}
