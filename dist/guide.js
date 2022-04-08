"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_equip_guide = exports.send_backstroy_guide = exports.send_job_guide = exports.send_skill_guide = exports.send_manual_ability_guide = exports.send_setup_guide = exports.send_ability_guide = exports.send_main_guide = void 0;
const discord_js_1 = require("discord.js");
const message_format_1 = require("./message/message_format");
const insert_1 = require("./sql/insert");
const ability_1 = require("./ability");
const select_1 = require("./sql/select");
const skill_1 = require("./skill");
const send_main_guide = async (client) => {
    const channel = await client.channels.fetch('956028972645376060');
    const row = new discord_js_1.MessageActionRow()
        .addComponents(new discord_js_1.MessageButton()
        .setCustomId('create_room')
        .setLabel('방 생성하기')
        .setStyle('SUCCESS'));
    await channel.sendTyping();
    await channel.send('>>> ' + message_format_1.MAIN_GUIDE);
    // +  '\n\n' + '대기중인 방 수 : ``' + ready_room + '``\n진행중인 방 수 : ``' + play_room + '``'
    await channel.send({ components: [row] });
};
exports.send_main_guide = send_main_guide;
const send_ability_guide = async (message) => {
    if (!(message.content === '!특성치'))
        return;
    message.channel.send(message_format_1.MAKE_ABILITY_GUIDE);
};
exports.send_ability_guide = send_ability_guide;
const send_setup_guide = async (message) => {
    if (!(message.content === '!가이드'))
        return;
    message.channel.send(message_format_1.USER_ALL_GUIDE);
};
exports.send_setup_guide = send_setup_guide;
const send_manual_ability_guide = async (message, user_id) => {
    if (!(message.content === '!특성치 입력'))
        return;
    ability_1.ability_stat.start = true;
    (0, insert_1.create_first_ability)(user_id);
    message.channel.send(message_format_1.MAKE_ABILITY_MANUAL_GUIDE);
};
exports.send_manual_ability_guide = send_manual_ability_guide;
const send_skill_guide = async (message, user_id) => {
    if (!(message.content === '!기능'))
        return;
    if (await (0, select_1.get_count_user_skill_list)(user_id) === 0)
        await (0, insert_1.create_first_skill)(user_id, await (0, skill_1.make_skill_point)(user_id));
    if (await (0, select_1.get_count_battle_status)(user_id) === 0)
        await (0, insert_1.create_first_battle_status)(user_id);
    message.channel.send(message_format_1.MAKE_SKILL_SET_GUIDE);
};
exports.send_skill_guide = send_skill_guide;
const send_job_guide = async (message, user_id) => {
    if (!(message.content === '!직업'))
        return;
    if (await (0, select_1.get_count_user_status)(user_id) === 0) {
        await (0, insert_1.create_first_user_status)(user_id);
    }
    await message.channel.send(message_format_1.JOB_GUIDE);
    return;
};
exports.send_job_guide = send_job_guide;
const send_backstroy_guide = async (message) => {
    if (!(message.content === '!백스토리'))
        return;
    await message.channel.send(message_format_1.BACKSTORY_GUIDE);
    return;
};
exports.send_backstroy_guide = send_backstroy_guide;
const send_equip_guide = async (message) => {
    if (!(message.content === '!장비'))
        return;
    await message.channel.send(message_format_1.EQUIP_GUIDE);
    return;
};
exports.send_equip_guide = send_equip_guide;
