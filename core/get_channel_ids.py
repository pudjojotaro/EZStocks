import asyncio
from pyrogram import Client # type: ignore
import json

# Load credentials and configuration from JSON file
with open("credentials.json", "r") as file:
    creds = json.load(file)

# Pyrogram Setup
api_id = creds["api_id"]
api_hash = creds["api_hash"]
app = Client("testsession", api_id=api_id, api_hash=api_hash)

async def get_chat_IDS():
    async with app:
        async for dialog in app.get_dialogs():
            # Printing both the title (or first name, if it's a user chat) and the chat ID
            print(f"Name: {dialog.chat.title or dialog.chat.first_name}, ID: {dialog.chat.id}")

app.run(get_chat_IDS())