"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const guide_1 = require("./guide");
const ability_1 = require("./ability");
const skill_1 = require("./skill");
const job_1 = require("./job");
const kpc_command_1 = require("./kpc/kpc_command");
const utill_1 = require("./utill/utill");
const discord_js_1 = require("discord.js");
const dice_1 = require("./dice");
const view_1 = require("./view/view");
const backstory_1 = require("./backstory");
const equip_1 = require("./equip");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        discord_js_1.Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        discord_js_1.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
});
client.on('ready', async () => {
    console.log('TRPG WORLD ON');
    (0, guide_1.send_main_guide)(client);
});
client.on('message', async (message) => {
    if (message.channel.type == 'DM' || message.author.bot)
        return;
    const user_id = message.member?.user.id ?? Math.floor(Math.random() * 999999999999999).toString();
    if (message.content === '!정리') {
        message.delete();
        await message.channel.bulkDelete(100);
    }
    if (message.content.startsWith('!KPC')) {
        const command = message.content.substring(5);
        await (0, kpc_command_1.edit_user_ability)(message, command); // !KPC 950231695163031603 근력 40  이렇게 입력 받으면 해당 유저의 탐사자 정보의 근력 값이 40으로 수정 된다
    }
    await (0, guide_1.send_setup_guide)(message);
    await (0, guide_1.send_ability_guide)(message);
    await (0, guide_1.send_manual_ability_guide)(message, user_id);
    await (0, guide_1.send_skill_guide)(message, user_id);
    await (0, guide_1.send_job_guide)(message, user_id);
    await (0, guide_1.send_backstroy_guide)(message);
    await (0, guide_1.send_equip_guide)(message);
    await (0, skill_1.clear_user_skill)(message, user_id);
    await (0, ability_1.clear_manual_ability)(message, user_id);
    await (0, ability_1.check_manual_ability)(message, user_id);
    await (0, ability_1.delete_ability)(message, user_id);
    await (0, dice_1.san_dice)(message, user_id);
    await (0, dice_1.set_dice)(message);
    await (0, ability_1.set_auto_ability)(message, user_id);
    await (0, ability_1.set_manual_ability)(message, user_id);
    await (0, view_1.view_user_sheet)(message, user_id);
    await (0, skill_1.get_user_all_skill_list)(message, user_id);
    await (0, skill_1.add_user_skill_list)(message, user_id);
    await (0, skill_1.show_user_skill_list)(message, user_id);
    await (0, equip_1.clear_equip)(message, user_id);
    await (0, job_1.set_p_name)(message, user_id);
    await (0, job_1.set_p_sex)(message, user_id);
    await (0, job_1.set_p_age)(message, user_id);
    await (0, job_1.set_p_url)(message, user_id);
    await (0, job_1.set_p_job)(message, user_id);
    await (0, job_1.end_job_command)(message);
    await (0, equip_1.make_equip)(message, user_id);
    await (0, backstory_1.make_backstory)(message, user_id);
});
client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) { //버튼 눌렀을 때 이벤트
        const channel = await client.channels.fetch(interaction.channelId);
        await (0, utill_1.create_room)(interaction, channel, client);
    }
});
client.login(process.env.BOT_TOKEN);
