# Local Discord Bot

This is a simple Discord bot that utilizes the Eris library and integrates with the OpenAI API.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Prerequisites

Before setting up the bot, you'll need to create a new bot on the Discord Developer Portal and obtain a bot token. Follow these steps:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click "New Application" and give your application a name.
3. Go to the "Bot" tab on the left side and click "Add Bot".
4. After creating the bot, copy the token from the "Bot" tab. You'll need this for the `.env` file.

## Setup

1. Clone this repository to your local machine:

```sh
git clone https://github.com/amoreaulemay/discord-gpt-bot.git
```

2. Navigate to the project directory:

```sh
cd local_discord
```

3. Install the required dependencies:

```sh
npm install
```

4. Create a `.env` file in the root of the project directory with the following variables:

```sh
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORGANIZATION_ID=your_openai_organization_id
DISCORD_BOT_TOKEN=your_discord_bot_token
```

Replace `your_openai_api_key`, `your_openai_organization_id`, and `your_discord_bot_token` with your actual OpenAI API key, OpenAI organization ID, and Discord bot token, respectively.

5. Build the project:

```sh
npm run build
```

6. Start the bot:

```sh
npm start
```

Your bot should now be running and connected to your Discord server. Enjoy using your new Discord bot!