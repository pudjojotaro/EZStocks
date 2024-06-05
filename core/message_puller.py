from pyrogram import Client # type: ignore

api_id = '22125082'  # Replace with your actual api_id
api_hash = '46f9d3e4015771def24972cb08d86ce6'  # Replace with your actual api_hash

app = Client("my_session", api_id=api_id, api_hash=api_hash)

async def get_chat_IDS():
    async with app:
        async for dialog in app.get_dialogs():
            # Printing both the title (or first name, if it's a user chat) and the chat ID
            print(f"Name: {dialog.chat.title or dialog.chat.first_name}, ID: {dialog.chat.id}")



async def main():
    await get_chat_IDS()

app.run(main())