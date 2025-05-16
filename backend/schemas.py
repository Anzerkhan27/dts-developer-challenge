#backend/schemas.py

from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime


class TaskUpdate(BaseModel):
    status: str

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = Field(default="pending")
    due_datetime: datetime

class Task(TaskCreate):
    id: UUID
