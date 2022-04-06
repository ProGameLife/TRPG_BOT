import "dotenv/config";
import {
    send_job_guide,
    send_main_guide, 
    send_setup_guide, 
    send_skill_guide,
    send_ability_guide, 
    send_manual_ability_guide,
    send_backstroy_guide,
} from "./guide";
import { 
    delete_ability, 
    set_auto_ability, 
    set_manual_ability,
    check_manual_ability, 
    clear_manual_ability,
} from "./ability";
import { 
    clear_user_skill,
    add_user_skill_list,
    show_user_skill_list,
    get_user_all_skill_list,
} from "./skill";
import {
    set_p_age,
    set_p_sex,
    set_p_job,
    set_p_url,
    set_p_name,
    end_job_command,
} from "./job";
import { create_room } from "./utill/utill";
import { Client, Intents, MessageActionRow, TextChannel } from "discord.js";
import { set_dice } from "./dice";
import { view_user_sheet } from "./view/view";

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
    
    await send_setup_guide(message);
    await send_ability_guide(message);
    await send_manual_ability_guide(message, user_id);
    await send_skill_guide(message, user_id);
    await send_job_guide(message, user_id);
    await send_backstroy_guide(message);

    await clear_user_skill(message, user_id);
    await clear_manual_ability(message, user_id);
    await check_manual_ability(message, user_id);
    await delete_ability(message, user_id);

    await set_dice(message);
    await set_auto_ability(message, user_id);
    await set_manual_ability(message, user_id);

    await view_user_sheet(message, user_id);

    await get_user_all_skill_list(message, user_id);
    await add_user_skill_list(message, user_id);
    await show_user_skill_list(message, user_id);

    await set_p_name(message, user_id);
    await set_p_sex(message, user_id);
    await set_p_age(message, user_id);
    await set_p_url(message, user_id);
    await set_p_job(message, user_id);
    await end_job_command(message);
}); 

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) { //버튼 눌렀을 때 이벤트
        const channel = await client.channels.fetch(interaction.channelId) as TextChannel;
        await create_room(interaction, channel, client);
    }
});

client.login(process.env.BOT_TOKEN);