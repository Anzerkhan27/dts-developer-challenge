# 🏛️ DTS Developer Challenge – HMCTS Caseworker Task Manager

![CI](https://github.com/Anzerkhan27/dts-developer-challenge/actions/workflows/backend-ci.yml/badge.svg)
[![Railway Backend](https://img.shields.io/website?label=Backend%20API&url=https%3A%2F%2Fdts-developer-challenge-production.up.railway.app%2Fdocs)](https://dts-developer-challenge-production.up.railway.app/docs)
[![Cloudflare Frontend](https://img.shields.io/website?label=Frontend%20App&url=https%3A%2F%2Fdts-developer-challenge.pages.dev)](https://dts-developer-challenge.pages.dev)



A full-stack application designed for HMCTS caseworkers to manage tasks efficiently.
Built with **FastAPI** (backend) and **React + TypeScript** (frontend), styled using the **GOV.UK Design System principles** with Tailwind CSS.

---

## ✅ Live Demo Links

* **Backend (Railway)**: [https://dts-developer-challenge-production.up.railway.app](https://dts-developer-challenge-production.up.railway.app/docs)
* **Frontend (Cloudflare Pages)**: [https://dts-developer-challenge.pages.dev](https://dts-developer-challenge.pages.dev)

---

## 🎯 Objective

To demonstrate the ability to:

* Build a REST API with CRUD capabilities
* Develop a professional GOV.UK-style frontend interface
* Apply best coding practices, testing, CI/CD, and deployment

---

## 📦 Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Backend    | FastAPI, SQLAlchemy, PostgreSQL     |
| Frontend   | React + TypeScript, Tailwind CSS    |
| Styling    | GOV.UK-inspired layout via Tailwind |
| CI/CD      | GitHub Actions                      |
| Deployment | Railway (API), Cloudflare (UI)      |

---

## 🧪 Features

### Backend

* [x] REST API with `/tasks` CRUD
* [x] UUID-based unique task IDs
* [x] PostgreSQL support with SQLite fallback
* [x] CORS enabled
* [x] API schema via OpenAPI (`/docs`)
* [x] Input validation and error handling
* [x] CI via GitHub Actions
* [x] Full test coverage with Pytest

### Frontend

* [x] Task creation, viewing, status update, deletion
* [x] Filter between open, complete, all tasks
* [x] GOV.UK-style navigation and layout
* [x] Search bar with real-time filtering
* [x] Responsive UI with Tailwind CSS
* [x] Collapsible task creation form
* [x] Modal for delete confirmation
* [x] Alert messages for task status

---



# 📊 API Endpoint Documentation

All API endpoints are served under the base URL:

**Production Base URL:** `https://dts-developer-challenge-production.up.railway.app`

---

## ✅ Health Check

**GET** `/ping`

**Description:** Simple health check endpoint to verify that the API is up.

**Response:**

```json
{
  "message": "pong"
}
```

---

## 📅 Create a New Task

**POST** `/tasks`

**Description:** Creates a new task.

**Request Body:**

```json
{
  "title": "string",
  "description": "string (optional)",
  "status": "Open",
  "due_datetime": "YYYY-MM-DDTHH:MM"
}
```

**Response:** `201 Created`

```json
{
  "id": "UUID",
  "title": "string",
  "description": "string or null",
  "status": "string",
  "due_datetime": "ISO format"
}
```

---

## 📂 Retrieve All Tasks

**GET** `/tasks`

**Description:** Returns a list of all existing tasks.

**Response:** `200 OK`

```json
[
  {
    "id": "UUID",
    "title": "string",
    "description": "string or null",
    "status": "string",
    "due_datetime": "ISO format"
  },
  ...
]
```

---

## 🔍 Retrieve a Task by ID

**GET** `/tasks/{id}`

**Path Parameter:** `id` (UUID of the task)

**Response:**

```json
{
  "id": "UUID",
  "title": "string",
  "description": "string or null",
  "status": "string",
  "due_datetime": "ISO format"
}
```

**404 if not found:**

```json
{
  "detail": "Task not found"
}
```

---

## ✅ Update Task Status

**PUT** `/tasks/{id}`

**Path Parameter:** `id` (UUID of the task)

**Request Body:**

```json
{
  "status": "Complete"
}
```

**Response:**

```json
{
  "id": "UUID",
  "title": "string",
  "description": "string or null",
  "status": "Complete",
  "due_datetime": "ISO format"
}
```

---

## ❌ Delete a Task

**DELETE** `/tasks/{id}`

**Path Parameter:** `id` (UUID of the task)

**Response:**

```json
{
  "detail": "Task deleted"
}
```

**404 if not found:**

```json
{
  "detail": "Task not found"
}
```

---

## 🎯 Notes

* All endpoints return JSON.
* All task operations use UUIDs for unique identification.
* Dates should be in ISO 8601 format (e.g., `2024-12-01T10:30`).
* CORS is enabled for frontend integrations.
* Suitable for use with Swagger UI (`/docs`) and Redoc (`/redoc`).




## 🧪 Backend Tests

Located in `/backend/tests/`

| Test Function         | Coverage             |
| --------------------- | -------------------- |
| `test_ping`           | Health check         |
| `test_create_task`    | Task creation        |
| `test_get_tasks`      | Task retrieval (all) |
| `test_get_task_by_id` | Specific task fetch  |
| `test_update_task`    | Status update        |
| `test_delete_task`    | Deletion             |

CI runs tests on push via GitHub Actions.

---

## 📂 Project Structure

```
dts-developer-challenge/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── tests/
├── frontend/
│   ├── src/components/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/workflows/
│   └── backend-ci.yml
```

---

## 🔐 Environment Variables

### Backend (`.env`)

```
DATABASE_URL=your_postgres_url
```

If not provided, defaults to SQLite: `sqlite:///./tasks.db`

### Frontend (`.env` or Cloudflare)

```
VITE_API_URL=https://dts-developer-challenge-production.up.railway.app
```

---


Absolutely — here’s a professional **CI/CD** section you can include right at the start of your README, just below the live demo or introduction:

---

## ⚙️ CI/CD & Deployment

This project includes a complete Continuous Integration and Deployment (CI/CD) setup using:

| Tool                 | Purpose                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **GitHub Actions**   | Automated tests on every push to `main`, triggered via `.github/workflows/backend-ci.yml`                           |
| **Railway**          | Backend deployment with PostgreSQL plugin and auto-rebuild on push                                                  |
| **Cloudflare Pages** | Frontend deployment via GitHub integration, with environment variable support and production build from `/frontend` |

### ✅ CI Pipeline Highlights

* Unit tests for backend run automatically using `pytest`
* CI fails early on syntax or test errors
* Railway auto-deploys backend on commit
* Cloudflare builds and deploys frontend from `main` using `vite build`
* Environment variable `VITE_API_URL` used to connect frontend to backend

---


## 🏁 Getting Started

### Run Backend Locally

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Access API: [http://localhost:8000/docs](http://localhost:8000/docs)

### Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

---


## ✅ Summary of Completed Scope

| Area        | Completed ✅                   |
| ----------- | ----------------------------- |
| Backend API | Full task CRUD, CI, tests     |
| Frontend UI | GOV.UK design, task ops, UX   |
| Deployment  | Railway + Cloudflare deployed |
| Testing     | Pytest + GitHub CI            |
| Database    | PostgreSQL (prod) / SQLite    |

---


## 🧾 Final Notes

* GOV.UK styling adhered to as close as possible via Tailwind utility classes
* Collapsible form + modal added for UI polish
* Clean separation of components and logic for extensibility
* Fallback mechanisms for database ensure portability across environments
