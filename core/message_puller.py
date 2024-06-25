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

# Pyrogram Setup
api_id = creds["api_id"]
api_hash = creds["api_hash"]
cluster_url = creds["cluster_url"]
app = Client("testsession", api_id=api_id, api_hash=api_hash)

channels = [-1001394050290,
-1002192822496,
-1001777049825,
-1001866476187,
5326888498,
-1001246093763,
-1001766050210,
-1001955134896,
-1001166834860,
-1001744309146,
-1002008816299,
-1001324735280,
-1001571240278,
-1002111313107,
-1001893826477,
-1002058082266,
-1001809452705,
-1001508499403,
-1001991376382,
-1001787033206,
-1001958603264,
-1002037228034,
-1001316546666,
-1001787927735,
-1001655999598,
-1002053998944,
-1001180744251,
-1001509052721,
-1001984145239,
-1001610610024,
-1001922578442,
-1001714972521,
-1001640334119,
-1001727242343,
-1001597957008,
-1001887616323,
-1001798888241,
-1001411960688,
-1001742532307,
-1001754906826,
-1001923318180,
-1001236638219,
-1001865320251,
-1001801490663,
-1001393935104,
-1001706158692,
-1002151886918,
-1001729380520,
-1001842701539,
-1001191371830,
-1002063705887,
-1001778238344,
-1001837555190,
-1001907890859,
-1001516263031,
-1001631268257,
-1001637804045,
-1002026123893,
-1002008204333,
-1001577325485,
-1002109093415,
5969822472,
7016801008,
-1002115044118,
5790908304,
-1001452058801,
-1001727066682,
1589461828,
6466921956
]  # Add your channel IDs here


async def main():
    # Load existing messages from JSON file
    try:
        with open("messages.json", "r") as infile:
            all_messages = json.load(infile)
    except FileNotFoundError:
        all_messages = {}

    async with app:
        for channel_id in channels:
            # Get the latest message ID from the existing messages
            if str(channel_id) in all_messages and all_messages[str(channel_id)]:
                latest_message_id = max(msg["message_id"] for msg in all_messages[str(channel_id)])
            else:
                latest_message_id = 0

            messages = []
            async for message in app.get_chat_history(channel_id, limit=200):
                if message.id <= latest_message_id:
                    break  # Stop fetching older messages

                if message.photo:  # Skip messages with images
                    continue

                # Extract message details
                message_data = {
                    "channel_id": channel_id,
                    "date": message.date.isoformat(),
                    "message_id": message.id,
                    "reply_to_message_id": message.reply_to_message_id,
                    "text": message.text
                }

                # Store message data in list
                messages.append(message_data)

                print(f"Processed message {message.id} from channel {channel_id}.")

                # Sleep to control the rate of message fetching
                await asyncio.sleep(0.5)

            if str(channel_id) in all_messages:
                all_messages[str(channel_id)].extend(messages)
            else:
                all_messages[str(channel_id)] = messages

    # Save messages to JSON file
    with open("messages.json", "w") as outfile:
        json.dump(all_messages, outfile, ensure_ascii=False, indent=4)
        print(f"Saved messages to messages.json.")

app.run(main())
