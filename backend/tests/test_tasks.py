from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_task():
    payload = {
        "title": "Test task",
        "description": "This is a test",
        "status": "pending",
        "due_datetime": "2025-05-20T10:00:00"
    }

    response = client.post("/tasks", json=payload)
    
    assert response.status_code == 200
    data = response.json()

    assert "id" in data
    assert data["title"] == payload["title"]
    assert data["description"] == payload["description"]
    assert data["status"] == payload["status"]
    assert data["due_datetime"] == payload["due_datetime"]


def test_get_tasks():
    # First, create a task to make sure the DB isn’t empty
    payload = {
        "title": "Second test task",
        "description": "Fetch all tasks",
        "status": "pending",
        "due_datetime": "2025-05-20T14:00:00"
    }

    post_response = client.post("/tasks", json=payload)
    assert post_response.status_code == 200

    # Now test GET /tasks
    response = client.get("/tasks")
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1  # Could be more if test DB is reused

    # Validate one of the task structures
    task = data[-1]
    assert "id" in task
    assert task["title"] == payload["title"]
    assert task["description"] == payload["description"]
