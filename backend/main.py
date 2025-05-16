from fastapi import FastAPI
from database import engine
import models
from sqlalchemy.orm import Session
from fastapi import Depends
from database import SessionLocal
from schemas import TaskCreate, Task as TaskSchema
from models import Task as TaskModel
from uuid import uuid4





# Dependency to inject a DB session into routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



models.Base.metadata.create_all(bind=engine)


app = FastAPI()

@app.get("/ping")
def ping():
    return {"message": "pong"}



@app.post("/tasks", response_model=TaskSchema)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    new_task = TaskModel(
        id=uuid4(),
        title=payload.title,
        description=payload.description,
        status=payload.status,
        due_datetime=payload.due_datetime,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

