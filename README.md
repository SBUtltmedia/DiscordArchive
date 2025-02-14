# Discord Archive Bot

A Discord bot built with [discord.py](https://discordpy.readthedocs.io/) that archives an entire category of channels by:

- Cloning each channel (preserving its settings/permissions) so that a fresh, empty version remains.
- Renaming the original channels with a date stamp.
- Moving the original channels (with messages) to an archive category.
- Clearing permission overwrites on the archived channels and archive category, denying `@everyone` view permissions.

This bot is ideal for keeping a historical record of channel conversations while leaving a clean slate for future use.

#  Features

- **Channel Cloning:** Duplicates channels with their settings but without the messages.
- **Archiving:** Renames and moves original channels to a dated archive category.
- **Permission Management:** Clears custom permissions on archived channels and denies `@everyone` access.

# Requirements

- Python 3.8 or higher
- [discord.py](https://pypi.org/project/discord.py/)
- [python-dotenv](https://pypi.org/project/python-dotenv/)

# Installation
1. **Clone the Repository**

   ```
   git clone https://github.com/yourusername/discord-archive-bot.git
   cd discord-archive-bot
   ```
2. Set Up a Virtual Environment (Optional but Recommended)
  ```
  python -m venv venv
  ```
  On macOS/Linux:
  ```
  source venv/bin/activate
  ```
  On Windows:
  ```
  venv\Scripts\activate
  ```
3. Install Dependencies
  Ensure you have a requirements.txt file in your project directory with the following (or similar):
    ```
    discord.py==1.7.3
    python-dotenv==1.0.0
    ```
  Then run:
    ```
    pip install -r requirements.txt
    ```
4. Configure Environment Variables
  Rename the file .env_example to .env in the project root directory and modify the file with your Discord bot token:
    ```
    DISCORD_TOKEN=your_actual_bot_token_here
    ```
  Note: Replace your_actual_bot_token_here with your bot's token. Ensure there are no extra quotes or spaces.
  Go to https://discordpy.readthedocs.io/en/stable/discord.html and follow the instructions to obtain a discord token, (the full guide is good for making and inviting a bot to your server)


# Configuration
  ## Bot Permissions:
    Ensure your bot has the necessary permissions in your Discord server, such as:
      -Manage Channels
      -Manage Roles
      -Read Messages / Send Messages
  ## Command Prefix:
    The default command prefix is !. You can change it in main.py by modifying the line:
      ```bot = commands.Bot(command_prefix="!", intents=intents)```

# Running the Bot
  To start the bot, run the following command in your terminal:
    python main.py
  If everything is configured correctly, the bot will come online and be ready for use.

# Usage
  ## Archive Command:
  To archive a category of channels, use the !archive command followed by the category name or a mention of the category.
  ## Syntax: 
    !archive "category"

  ## What Happens When You Run the Command
    ### Cloning:
      For each channel in the specified category, a new channel is created (a clone) with the same settings. This channel remains in the original category and is empty.

    ### Archiving:
      The original channels (with messages) are renamed (appending a date stamp, e.g., channelname-2025-02-13) and moved to a new archive category named Archive - YYYY-MM-DD.

    ### Permission Updates:
      Custom permission overwrites are cleared from the archived channels and archive category. Additionally, @everyone is explicitly denied permission to view the archived channels.

# Troubleshooting
  ## Token Error ('NoneType' object has no attribute 'strip'):
    This error indicates that the DISCORD_TOKEN environment variable isn’t being loaded properly.
      -Verify that your .env file is in the correct directory.
      -Check that the token is correct and does not contain extra spaces or quotes.

  ## Missing Permissions:
    Ensure the bot has the proper permissions (e.g., Manage Channels, Manage Roles) in your server.

  ## Command Not Recognized:
    Make sure you are using the correct command prefix (! by default) and that you have provided the category argument correctly.

# Contributing
  Feel free to open an issue or submit a pull request if you have suggestions or improvements. We wrote this readme with the intention of it being comprehensive for a beginner, so we hope you found it that way.

# License
  This project is licensed under the MIT License.
