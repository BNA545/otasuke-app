from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORSミドルウェアの設定
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
)

# アップロード用ディレクトリの作成
os.makedirs("uploads", exist_ok=True)

# テストデータ
MISSING_PERSONS = [
    {
        "id": "1",
        "title": "東京都渋谷区で行方不明",
        "description": "2024年2月15日午後3時頃、渋谷駅周辺で最後に目撃されました。黒いコートと青いジーンズを着用していました。",
        "name": "山田太郎",
        "age": 25,
        "gender": "male",
        "lastSeenLocation": "東京都渋谷区",
        "lastSeenDate": "2024-02-15T15:00",
        "photos": [],
        "contactInfo": "渋谷警察署",
        "createdAt": "2024-02-15T16:00",
        "hasReward": True,
        "rewardAmount": 500000
    },
    {
        "id": "2",
        "title": "大阪市中央区で行方不明",
        "description": "2024年2月14日午前10時頃、なんば駅付近で最後に目撃されました。赤いバッグを持っていました。",
        "name": "鈴木花子",
        "age": 18,
        "gender": "female",
        "lastSeenLocation": "大阪市中央区",
        "lastSeenDate": "2024-02-14T10:00",
        "photos": [],
        "contactInfo": "なんば警察署",
        "createdAt": "2024-02-14T11:00",
        "hasReward": False,
        "rewardAmount": None
    }
]

@app.get("/api/missing-persons")
async def get_missing_persons(
    keyword: Optional[str] = None,
    area: Optional[str] = None,
    age: Optional[str] = None,
    gender: Optional[str] = None
):
    filtered_data = MISSING_PERSONS
    return filtered_data

    # キーワード検索
    if keyword:
        filtered_data = [
            person for person in filtered_data
            if keyword.lower() in person["title"].lower() or
               keyword.lower() in person["description"].lower() or
               keyword.lower() in person["name"].lower()
        ]

    # エリア検索
    if area and area != "":
        filtered_data = [
            person for person in filtered_data
            if area in person["lastSeenLocation"]
        ]

    # 性別検索
    if gender and gender != "":
        filtered_data = [
            person for person in filtered_data
            if person["gender"] == gender
        ]

    # 年齢検索
    if age and age != "":
        age_ranges = {
            "0-12": (0, 12),
            "13-19": (13, 19),
            "20-40": (20, 40),
            "41-64": (41, 64),
            "65-": (65, 200)
        }
        if age in age_ranges:
            min_age, max_age = age_ranges[age]
            filtered_data = [
                person for person in filtered_data
                if min_age <= person["age"] <= max_age
            ]

    return filtered_data

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