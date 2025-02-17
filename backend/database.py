from motor.motor_asyncio import AsyncIOMotorClient

MONGODB_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGODB_URL)
db = client.otasuke_db