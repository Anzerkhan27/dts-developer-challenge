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



def test_get_task_by_id():
    # Create a task first
    payload = {
        "title": "Lookup task",
        "description": "Single task lookup",
        "status": "pending",
        "due_datetime": "2025-05-21T12:00:00"
    }

    post_response = client.post("/tasks", json=payload)
    assert post_response.status_code == 200
    task_id = post_response.json()["id"]

    # Now try to GET it by ID
    get_response = client.get(f"/tasks/{task_id}")
    assert get_response.status_code == 200

    data = get_response.json()
    assert data["id"] == task_id
    assert data["title"] == payload["title"]
    assert data["description"] == payload["description"]


def test_update_task_status():
    # Create a task to update
    payload = {
        "title": "Task to update",
        "description": "Should change status",
        "status": "pending",
        "due_datetime": "2025-05-22T15:00:00"
    }

    post_response = client.post("/tasks", json=payload)
    assert post_response.status_code == 200
    task_id = post_response.json()["id"]

    # Update the task status
    update_payload = {
        "status": "completed"
    }

    put_response = client.put(f"/tasks/{task_id}", json=update_payload)
    assert put_response.status_code == 200

    updated = put_response.json()
    assert updated["id"] == task_id
    assert updated["status"] == "completed"
    assert updated["title"] == payload["title"]
