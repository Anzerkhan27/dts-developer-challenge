from fastapi import FastAPI
from database import engine
import models
from typing import List
from sqlalchemy.orm import Session
from fastapi import Depends
from database import SessionLocal
from schemas import TaskCreate, Task as TaskSchema, TaskUpdate
from models import Task as TaskModel
from uuid import uuid4
from fastapi import HTTPException
from uuid import UUID


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


@app.get("/tasks", response_model=List[TaskSchema])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(TaskModel).all()



@app.get("/tasks/{task_id}", response_model=TaskSchema)
def get_task(task_id: UUID, db: Session = Depends(get_db)):
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task



@app.put("/tasks/{task_id}", response_model=TaskSchema)
def update_task_status(task_id: UUID, task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.status = task_update.status
    db.commit()
    db.refresh(task)
    return task
