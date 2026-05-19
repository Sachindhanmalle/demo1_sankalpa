# SANKALPA PU COLLEGE — Frontend

Next.js app for the AI-powered College ERP + Mock Test platform.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL=http://localhost:8000/api` in `.env.local`.

## Deploy on Vercel

- Root directory: `frontend` (if monorepo) or repo root (if this repo is frontend-only)
- Env: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`

## Demo login

- Student: `student1` / `student123`
- Admin: `admin` / `admin123`
