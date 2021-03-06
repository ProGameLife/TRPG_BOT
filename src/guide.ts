import {
    Client,
    Message,
    TextChannel,
    MessageButton, 
    MessageActionRow, 
} from "discord.js";
import { 
    KPC_GUIDE,
    JOB_GUIDE,
    MAIN_GUIDE, 
    EQUIP_GUIDE,
    USER_ALL_GUIDE, 
    BACKSTORY_GUIDE,
    MAKE_ABILITY_GUIDE, 
    MAKE_SKILL_SET_GUIDE,
    MAKE_ABILITY_MANUAL_GUIDE,
    COMMAND_GUIDE,
    COMMAND_GUIDE2,
} from "./message/message_format";
import { 
    create_first_skill, 
    create_first_ability, 
    create_first_user_status, 
    create_first_battle_status, 
} from "./sql/insert";
import { 
    get_count_user_status,
    get_count_battle_status, 
    get_count_user_skill_list, 
} from "./sql/select";
import { add_job } from "./job";
import { ability_stat } from "./ability";
import { make_skill_point } from "./skill";

export const send_main_guide = async (client: Client<boolean>) => {
    const channel = await client.channels.fetch('973475711471984640') as TextChannel;

    channel.bulkDelete(3);
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('create_room')
                .setLabel('방 생성하기')
                .setStyle('SUCCESS')
        )

    await channel.sendTyping();
    await channel.send('>>> ' + MAIN_GUIDE);
    // +  '\n\n' + '대기중인 방 수 : ``' + ready_room + '``\n진행중인 방 수 : ``' + play_room + '``'
    await channel.send({ components: [row] });

    return;
};

export const all_command_guide = async (client: Client<boolean>) => {
    const channel = await client.channels.fetch('974455172803735603') as TextChannel;

    await channel.bulkDelete(5);

    await channel.send(COMMAND_GUIDE);
    await channel.send(COMMAND_GUIDE2);
    return;
};

export const send_ability_guide = async (message: Message<boolean>) => {
    if(!(message.content === '!특성치')) return;

    await message.channel.send(MAKE_ABILITY_GUIDE);

    return;
};

export const send_setup_guide = async (message: Message<boolean>) => {
    if(!(message.content === '!가이드')) return;

    await message.channel.send(USER_ALL_GUIDE);
    
    return;
};

export const send_manual_ability_guide = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 수동')) return;

    ability_stat.start = true;
    await create_first_ability(user_id);
    await message.channel.send(MAKE_ABILITY_MANUAL_GUIDE);

    return;
};

export const send_skill_guide = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!기능')) return;

    if(await get_count_battle_status(user_id) === 0) await create_first_battle_status(user_id);
    if(await get_count_user_skill_list(user_id) === 0) await create_first_skill(user_id, await make_skill_point(user_id));

    await message.channel.send(MAKE_SKILL_SET_GUIDE);

    return;
};

export const send_job_guide = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!정보')) return;

    if(await get_count_user_status(user_id) === 0){
        await create_first_user_status(user_id);
    }
    add_job.start = true;
    await message.channel.send(JOB_GUIDE);

    return;
};

export const send_backstroy_guide = async (message: Message<boolean>) => {
    if(!(message.content === '!백스토리')) return;

    await message.channel.send(BACKSTORY_GUIDE);

    return;
};

export const send_equip_guide = async (message: Message<boolean>) => {
    if(!(message.content === '!장비')) return;

    await message.channel.send(EQUIP_GUIDE);

    return;
};

export const kpc_guide = async (message: Message<boolean>) => {
    if(!(message.content === '!KPC')) return;
    
    await message.channel.send(KPC_GUIDE);

    return;
}