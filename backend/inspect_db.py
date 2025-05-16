from database import SessionLocal
from models import Task  # SQLAlchemy model

db = SessionLocal()
tasks = db.query(Task).all()

print(f"Found {len(tasks)} task(s):")
for task in tasks:
    print(task.id, task.title, task.status)
