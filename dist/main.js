"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        discord_js_1.Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    ],
});
client.on('ready', async () => {
    console.log('TRPG WORLD ON');
});
client.on('message', async (message) => {
    if (message.channel.type == 'DM' || message.author.bot)
        return;
    if (message.content === '!ping') {
        message.reply('pong!');
    }
});
client.login(process.env.BOT_TOKEN);
