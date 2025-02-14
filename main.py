import os
import discord
from discord.ext import commands
import datetime
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")

if TOKEN is None:
    raise ValueError("DISCORD_TOKEN is not set. Please check your .env file.")

# Set up intents (adjust as necessary)
intents = discord.Intents.default()
intents.guilds = True
intents.guild_messages = True

# Create the bot with a command prefix of your choice
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.command()
@commands.has_permissions(manage_channels=True)
async def archive(ctx, category: discord.CategoryChannel):
    """
    Archives all channels in the given category by:
      - Cloning each channel (preserving settings/permissions) so the new channel is blank.
      - Renaming the original channel to include a date stamp.
      - Moving the original channel (with its messages) into a new archive category.
      - Wiping permission overwrites from the archived channel and explicitly denying @everyone the view_channel permission.
    """
    # Get the current date in the desired format
    now = datetime.datetime.now().strftime("%Y-%m-%d")
    
    # Create a new archive category (with the date in its name)
    archive_category = await ctx.guild.create_category(f"Archive - {now}")
    
    # Deny view permissions for @everyone on the archive category
    everyone = ctx.guild.default_role
    await archive_category.edit(overwrites={everyone: discord.PermissionOverwrite(view_channel=False)})
    
    # Notify that the archiving process has started
    message = f"Archiving all channels in **{category.name}**..."
    print(message)
    await ctx.send(message)


    # Iterate over all channels in the given category
    for channel in list(category.channels):
        # Clone the channel (creates a fresh channel with the same settings, but no messages)
        message = "Creating a fresh channel after archiving."
        print(message)
        cloned_channel = await channel.clone(reason=message)
        # Place the cloned channel back in the original category and maintain its position
        await cloned_channel.edit(category=category, position=channel.position)
        
        # Rename the original channel by appending the date stamp
        new_name = f"{channel.name}-{now}"
        # Move the original channel (with its messages) to the archive category
        await channel.edit(name=new_name, category=archive_category)
        
        # Clear all permission overwrites for the archived channel
        await channel.edit(overwrites={})
        
        # Explicitly deny @everyone permission to view the channel
        await channel.set_permissions(everyone, view_channel=False)
    message = "Category archived successfully!"
    print(message)
    await ctx.send(message)

# Run the bot using the token from your .env file
if __name__ == "__main__":
    bot.run(TOKEN)
