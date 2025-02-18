from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uuid
import os
from datetime import datetime

app = FastAPI()

# CORSの設定を更新
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://otasuke-app.vercel.app",
        "https://otasuke-k4fci445e-bna545s-projects.vercel.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# アップロード用ディレクトリの作成
os.makedirs("uploads", exist_ok=True)

# テストデータ
MISSING_PERSONS = [
    {
        "id": "1",
        "title": "東京都渋谷区で行方不明",
        "description": "2024年2月15日午後3時頃、渋谷駅周辺で最後に目撃されました。",
        "name": "山田太郎",
        "age": 25,
        "gender": "male",
        "lastSeenLocation": "東京都渋谷区",
        "lastSeenDate": "2024-02-15T15:00",
        "photos": [],
        "contactInfo": "渋谷警察署",
        "createdAt": "2024-02-15T16:00"
    }
]

@app.get("/api/missing-persons")
async def get_missing_persons(
    keyword: Optional[str] = None,
    area: Optional[str] = None,
    age: Optional[str] = None,
    gender: Optional[str] = None
):
    return MISSING_PERSONS

@app.post("/api/missing-persons")
async def create_missing_person(
    title: str = Form(...),
    description: str = Form(...),
    name: str = Form(...),
    age: int = Form(...),
    gender: str = Form(...),
    lastSeenLocation: str = Form(...),
    lastSeenDate: str = Form(...),
    photos: List[UploadFile] = File(None)
):
    photo_urls = []
    if photos:
        for photo in photos:
            file_location = f"uploads/{photo.filename}"
            with open(file_location, "wb+") as file_object:
                content = await photo.read()
                file_object.write(content)
            photo_urls.append(f"/uploads/{photo.filename}")

    new_person = {
        "id": str(uuid.uuid4()),
        "title": title,
        "description": description,
        "name": name,
        "age": age,
        "gender": gender,
        "lastSeenLocation": lastSeenLocation,
        "lastSeenDate": lastSeenDate,
        "photos": photo_urls,
        "contactInfo": "警察署に連絡してください",
        "createdAt": datetime.now().isoformat()
    }
    
    MISSING_PERSONS.append(new_person)
    return new_person