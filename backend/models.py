# backend/models.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    id: Optional[str] = None
    email: str
    password: str
    name: str
    created_at: Optional[datetime] = None

class MissingPerson(BaseModel):
    id: Optional[str] = None
    user_id: str
    title: str
    description: str
    name: str
    age: int
    gender: str
    last_seen_location: str
    last_seen_date: datetime
    reward: Optional[int] = None
    is_urgent: bool = False
    photos: List[str] = []
    contact_info: str
    additional_info: Optional[str] = None
    status: str = "searching"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class Message(BaseModel):
    id: Optional[str] = None
    sender_id: str
    receiver_id: str
    content: str
    missing_person_id: str
    created_at: datetime