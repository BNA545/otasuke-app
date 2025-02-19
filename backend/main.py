from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uuid
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# 環境変数からオリジンを取得
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,https://otasuke-app.vercel.app").split(",")
# 空白を削除
allowed_origins = [origin.strip() for origin in allowed_origins]

print(f"Allowed origins: {allowed_origins}")

# CORSの設定 - origin設定の変更
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",  # すべてのVercelドメインを許可（オプション）
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["Content-Type", "Authorization"],
    max_age=600,  # プリフライトリクエストの結果をキャッシュする時間（秒）
)

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
        "createdAt": "2024-02-15T16:00"
    }
]

# ヘルスチェックエンドポイントの追加
@app.get("/")
async def root():
    return {"status": "ok", "message": "API is running"}

@app.get("/api")
async def api_root():
    return {"status": "ok", "message": "API is running", "endpoints": ["/api/missing-persons"]}

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
        # アップロードディレクトリの確認
        uploads_dir = "uploads"
        if not os.path.exists(uploads_dir):
            os.makedirs(uploads_dir)
            
        for photo in photos:
            file_location = f"{uploads_dir}/{photo.filename}"
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

# 起動時のメイン関数
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=False)