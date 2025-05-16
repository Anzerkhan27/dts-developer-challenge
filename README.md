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

````




