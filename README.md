# DTS Developer Challenge – HMCTS

A lightweight task management API built with **FastAPI**, designed for HMCTS caseworkers to manage tasks efficiently.

## ✅ Live Demo

API is deployed at:  
**[https://your-railway-url.up.railway.app/ping](https://your-railway-url.up.railway.app/ping)**

> Replace with your actual Railway URL

---

## ⚙️ Features Implemented (Phase 1)

- [x] `/ping` health route
- [x] FastAPI backend scaffolded in `/backend`
- [x] Unit test for `/ping` using `pytest`
- [x] CI pipeline with GitHub Actions (`pytest` runs on push)
- [x] Deployment to Railway with subfolder config

---

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| Backend | FastAPI |
| Testing | Pytest |
| CI/CD | GitHub Actions |
| Deployment | Railway |
| Language | Python 3.11 |

---

## 🧪 Run Locally

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
````

Open:
[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## ✅ Running Tests

```bash
cd backend
pytest
```

---

## 📦 Project Structure

```
dts-developer-challenge/
│
├── backend/
│   ├── main.py          # FastAPI app entrypoint
│   ├── test_ping.py     # Unit test for /ping route
│   └── requirements.txt
│
└── .github/workflows/
    └── backend-ci.yml   # GitHub Actions for CI
```

---

## ✏️ Author

Anzer Khan – [linkedin.com/in/anzer-khan-31a14a209](https://linkedin.com/in/anzer-khan-31a14a209)

---

## 🏁 Next Steps (Planned)

* [ ] Implement full CRUD for `/tasks`
* [ ] Add input validation and error handling
* [ ] Add database support (PostgreSQL or SQLite)
* [ ] Deploy frontend to Cloudflare (optional)




# 📦 DTS Developer Challenge – Backend Summary

## 👤 Candidate

**Anzer Khan**
Applying for: **Software Developer (SEO) – HMCTS (Job ID: 4537)**

---

## 🔧 Tech Stack Used

| Area             | Tooling/Frameworks         |
| ---------------- | -------------------------- |
| Backend          | FastAPI, Uvicorn           |
| Language         | Python 3.11                |
| Database (local) | SQLite (file)              |
| Tests            | Pytest, FastAPI TestClient |
| CI/CD            | GitHub Actions             |
| Deployment       | Railway (Dockerized)       |
| Schema & Models  | Pydantic + SQLAlchemy ORM  |

---

## ✅ API Requirements Implemented

| Feature             | Endpoint             | Status |
| ------------------- | -------------------- | ------ |
| Ping Test           | `GET /ping`          | ✅      |
| Create a Task       | `POST /tasks`        | ✅      |
| Retrieve All Tasks  | `GET /tasks`         | ✅      |
| Retrieve Task by ID | `GET /tasks/{id}`    | ✅      |
| Update Task Status  | `PUT /tasks/{id}`    | ✅      |
| Delete a Task       | `DELETE /tasks/{id}` | ✅      |

---

## ⚙️ Key Concepts Demonstrated

* **Schema Validation** using Pydantic (`TaskCreate`, `Task`, `TaskUpdate`)
* **Separation of Concerns**: `models.py`, `schemas.py`, `database.py`, `main.py`
* **Error Handling** with custom `404` and validation errors
* **Test Coverage** for all endpoints using `pytest`
* **CI Integration** via GitHub Actions (runs on every push to `main`)
* **Deployment** via Railway with containerized FastAPI app
* **Live API Testing** via Swagger UI at `/docs`

---

## 🧪 Tests Implemented

* ✅ `test_ping()`
* ✅ `test_create_task()`
* ✅ `test_get_tasks()`
* ✅ `test_get_task_by_id()`
* ✅ `test_update_task_status()`
* ✅ `test_delete_task()`

Each test:

* Creates real task data via `POST`
* Validates API behavior
* Cleans itself up where needed
* Is automatically triggered via CI on push

---

## 🧠 Notes

* Local DB used: `sqlite:///./tasks.db` for development
* In-memory DB for tests **deferred until post-MVP**, based on scope
* Project uses **UUIDs** for task IDs and ISO-formatted `due_datetime`
* Container is deployed via **Railway Nixpacks** with a `uvicorn` start command

---

## 🔜 Next Steps

* [ ] Build frontend with React (or GOV.UK-styled template)
* [ ] Connect to FastAPI endpoints
* [ ] Deploy frontend (Cloudflare or Netlify)
* [ ] Add PostgreSQL plugin on Railway for production persistence

---



## 🚀 DTS Developer Challenge – Caseworker Task Manager

This full-stack project is built for the HMCTS Developer Challenge. It allows caseworkers to manage tasks via a clean API and user-friendly frontend interface.

---

### ✅ Features Implemented

- 🔧 **FastAPI Backend**
  - Create, update, delete, and retrieve tasks
  - Validation with Pydantic models
  - SQLite for local development
  - UUID-based unique task IDs
  - CORS enabled for local development
  - RESTful endpoints

- 💻 **React + TypeScript Frontend**
  - Fetches and displays tasks from backend
  - Clean component-based architecture
  - Tailwind CSS for rapid UI styling
  - Environment-based backend switching (`.env` support)

- 🧪 **Testing + CI**
  - Pytest unit tests for backend
  - GitHub Actions CI (runs on every push to `main`)
  - Local and CI test environments verified

- 🚀 **Deployment**
  - Backend deployed via Railway using Docker
  - CI pipeline tested and verified for production pushes

---

### 🔮 Future Work (Planned)

- ✅ **Task Creation from Frontend**
- ✅ **Task Status Update (e.g., Mark as Complete)**
- ✅ **Task Deletion UI**
- ⏳ **Form validation and user feedback on frontend**
- ⏳ **Connect production frontend to Railway backend**
- ⏳ **Switch database to PostgreSQL in production**
- ⏳ **Add dark mode toggle (optional UI enhancement)**
- ⏳ **Final polishing, responsiveness, and accessibility audit**
- ⏳ **Refactor into clean reusable components**
- ⏳ **Polish README and add live demo links**

---

### 🧠 Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Backend    | FastAPI, SQLite, SQLAlchemy   |
| Frontend   | React + TypeScript, Vite      |
| Styling    | Tailwind CSS                  |
| CI/CD      | GitHub Actions                |
| Deployment | Railway (Dockerized backend)  |
```

---

