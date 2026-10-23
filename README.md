# AI Wealth Builder

An AI-powered investment and wealth management dashboard built with Next.js and FastAPI.

> ⚠️ This project was generated end-to-end with [Cursor](https://www.cursor.sh/) as an experiment in AI-driven development — no code was written by hand.

## Features

* 📊 Portfolio management
* 💰 Budget tracking
* 📈 Investment analytics
* 🤖 AI-powered recommendations
* 📱 Responsive design
* 🔐 JWT authentication

## Tech stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Recharts

**Backend:** FastAPI (Python), SQLite via SQLAlchemy/SQLModel, JWT authentication

An experimental Rust (Actix Web + PostgreSQL) backend prototype is also included in `src/`.

## Getting started

### Prerequisites

* Node.js 18+
* Python 3.8+

### 1. Clone

```bash
git clone https://github.com/eshaq95/ai-wealth-builder.git
cd ai-wealth-builder
```

### 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # then set SECRET_KEY to a long random string
uvicorn main:app --reload       # http://localhost:8000
```

### 3. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev                     # http://localhost:3000
```

## Configuration

Settings are read from `.env` files, which are not committed. Copy the templates:

* `backend/.env.example` — `DATABASE_URL`, `SECRET_KEY`, `CORS_ORIGINS`
* `.env.example` — `DATABASE_URL` for the Rust prototype
