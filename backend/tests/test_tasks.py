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
