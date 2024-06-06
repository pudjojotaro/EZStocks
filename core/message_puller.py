import asyncio
from pyrogram import Client # type: ignore
from pymongo import MongoClient # type: ignore
from pymongo.mongo_client import MongoClient # type: ignore
from pymongo.server_api import ServerApi # type: ignore
from urllib.parse import quote_plus
import json

# Load credentials and configuration from JSON file
with open("credentials.json", "r") as file:
    creds = json.load(file)

# MongoDB Connection Setup
username = creds["username"]
password = creds["password"]
cluster_url = creds["cluster_url"]

client = MongoClient(
    f"mongodb+srv://{username}:{password}@{cluster_url}/?retryWrites=true&w=majority&appName=Cluster0",
    server_api=ServerApi('1')
)

db = client['telegram']
collection = db['messages']

# Pyrogram Setup
api_id = creds["api_id"]
api_hash = creds["api_hash"]
app = Client("testsession", api_id=creds["api_id"], api_hash=creds["api_hash"])

async def main():
    channel_id = -1001893826477
    async with app:
        async for message in app.get_chat_history(channel_id):
            # Extract message details
            message_data = {
                "channel_id": channel_id,
                "date": message.date,
                "message_id": message.id,
                "reply_to_message_id": message.reply_to_message_id,
                "text": message.text
            }
            # Insert message into MongoDB
            try:
                collection.insert_one(message_data)
                print(f"Inserted message {message.id} into MongoDB.")
            except Exception as e:
                print(f"Failed to insert message {message.id}: {e}")
            
            # Sleep to control the rate of message fetching
            await asyncio.sleep(2)

app.run(main())


