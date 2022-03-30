import "dotenv/config";
import { Client, Intents, TextChannel } from "discord.js";
import { create_room, send_main_guide, send_ability_guide, send_setup_guide, send_manual_ability_guid} from "./guide"
import { set_dice } from "./dice"
import { check_manual_ability, clear_manual_ability, delete_ability, set_auto_ability, set_manual_ability } from "./ability"

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
});

client.on('ready', async () => {
    console.log('TRPG WORLD ON');
    send_main_guide(client);
});

client.on('message',async (message) => {
    if(message.channel.type == 'DM' || message.author.bot) return;
    const user_id = message.member?.user.id ?? Math.floor(Math.random() * 999999999999999).toString();

    if(message.content === '!정리'){
        message.delete();
        await message.channel.bulkDelete(100);
    }

    send_setup_guide(message);
    send_ability_guide(message);
    send_manual_ability_guid(message, user_id);

    clear_manual_ability(message, user_id);
    check_manual_ability(message, user_id);
    delete_ability(message, user_id);
    
    set_dice(message);
    set_auto_ability(message, user_id);
    set_manual_ability(message, user_id);
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) { //버튼 눌렀을 때 이벤트
        const channel = await client.channels.fetch(interaction.channelId) as TextChannel;
        create_room(interaction, channel, client);
    }
});

client.login(process.env.BOT_TOKEN);