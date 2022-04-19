import { view_equip } from "../equip";
import { view_user_status } from "../job";
import { view_backstory } from "../backstory";
import { get_ability_status } from "../ability";
import { view_uses_skill_list } from "../skill";
import { get_all_user_id, get_battle_status } from "../sql/select";
import { Message, MessageEmbed, } from "discord.js";

const NULL_VALUE = '-';

export const view_user_sheet = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!탐사자 시트')) return;

    
    const equip = await view_equip(user_id) ?? NULL_VALUE;
    const backstory = await view_backstory(user_id) ?? NULL_VALUE;
    const view_user = await view_user_status(user_id);
    const view_ability = await get_ability_status(user_id);
    const view_skill = await view_uses_skill_list(user_id);
    const battle_status = await view_battle_status(user_id);
    const number_of_stat = await exchange_stat(view_skill.uses_skill_stat);
    const avoid = view_ability[3] ?? 0;

    let USER_VALUE = [];
    let SKILL_VALUES = [];

    for(let i = 0; i < 9; i++){ // 특성치
        if(view_ability[i] === undefined){
            USER_VALUE[i] = NULL_VALUE;
        }else{
            USER_VALUE[i] = String(view_ability[i]) + '/' + String(Math.floor(view_ability[i] / 2)) + '/' + String(Math.floor(view_ability[i] * 0.2));
        }
    }
    for(let i = 0; i < view_skill.uses_skill_stat.length; i++){ // 스킬
        if(view_skill.uses_skill_stat[i] === undefined || view_skill.uses_skill_stat[i] === NULL_VALUE){
            SKILL_VALUES[i] = NULL_VALUE;
        }else{
            SKILL_VALUES[i] = view_skill.uses_skill_stat[i] + ' / ' + String(Math.floor(number_of_stat[i] / 2)) + ' / ' + String(Math.floor(number_of_stat[i] * 0.2));
        }
    }
    
    
    const embed = new MessageEmbed()
        .setColor('#C171F5')
        .setTitle('👤 탐사자 시트')
        .setThumbnail(view_user.url ?? 'https://png.clipart.me/istock/previews/9349/93493545-people-icon.jpg')
        .addFields(
            { name: '이름', value: view_user.name ?? NULL_VALUE},
            { name: '플레이어', value: '<@' + user_id + '>' },
            { name: '직업', value: view_user.job ?? NULL_VALUE, inline: true},
            { name: '나이', value: String(view_user.age ?? NULL_VALUE) , inline: true }, 
            { name: '성별', value: view_user.sex ?? NULL_VALUE, inline: true},
            { name: 'ㅤ', value: '**🔧특성치**', inline: false},
            { name: '💪근력', value: USER_VALUE[0] ?? NULL_VALUE, inline: true },
            { name: '🫀건강', value: USER_VALUE[1] ?? NULL_VALUE, inline: true },
            { name: '📏크기', value: USER_VALUE[2] ?? NULL_VALUE, inline: true },
            { name: '👢민첩성', value: USER_VALUE[3] ?? NULL_VALUE, inline: true },
            { name: '🌹외모', value: USER_VALUE[4] ?? NULL_VALUE, inline: true },
            { name: '🧠지능', value: USER_VALUE[5] ?? NULL_VALUE, inline: true },
            { name: '😫정신력', value: USER_VALUE[6] ?? NULL_VALUE, inline: true },
            { name: '📓교육', value: USER_VALUE[7] ?? NULL_VALUE, inline: true },
            { name: '🍀운', value: String(USER_VALUE[8]) ?? NULL_VALUE, inline: true },
            { name: 'ㅤ', value: '**🛠특수 특성치**', inline: false },
            { name: '🦶🏻이동력', value: String(view_ability[9] ?? NULL_VALUE) , inline: true },
            { name: '🩸HP', value: String(view_ability[10] ?? NULL_VALUE) , inline: true },
            { name: '🔷MP', value: String(view_ability[11] ?? NULL_VALUE) , inline: true },
            { name: '👽이성치', value: String(view_ability[12] ?? NULL_VALUE) , inline: true },
            { name: '🤪광기(일시적,장기적)', value: battle_status[0] ?? NULL_VALUE, inline: true },
            { name: 'ㅤ', value: '**🗡전투 특성치**', inline: false },
            { name: '👊피해 보너스', value: '없음', inline: true },
            { name: '🏃회피', value: String(Math.floor(avoid / 2)) ?? NULL_VALUE, inline: true },
            { name: '💀빈사(의식불명)', value: battle_status[1] ?? NULL_VALUE, inline: true },
        )
    const embed2 = new MessageEmbed()
        .setColor('#C171F5')
        .addFields(
            { name: '**기능목록**', value: 'ㅤ', inline: false },
            { name: view_skill.uses_skill_name[0] ?? NULL_VALUE, value: SKILL_VALUES[0] ?? NULL_VALUE, inline: true },
            { name: view_skill.uses_skill_name[1] ?? NULL_VALUE, value: SKILL_VALUES[1] ?? NULL_VALUE, inline: true },
            { name: view_skill.uses_skill_name[2] ?? NULL_VALUE, value: SKILL_VALUES[2] ?? NULL_VALUE, inline: true },
            { name: view_skill.uses_skill_name[3] ?? NULL_VALUE, value: SKILL_VALUES[3] ?? NULL_VALUE, inline: true },
            { name: view_skill.uses_skill_name[4] ?? NULL_VALUE, value: SKILL_VALUES[4] ?? NULL_VALUE, inline: true },
            { name: view_skill.uses_skill_name[5] ?? NULL_VALUE, value: SKILL_VALUES[5] ?? NULL_VALUE, inline: true },
            { name: view_skill.uses_skill_name[6] ?? NULL_VALUE, value: SKILL_VALUES[6] ?? NULL_VALUE, inline: true },
            { name: view_skill.uses_skill_name[7] ?? NULL_VALUE, value: SKILL_VALUES[7] ?? NULL_VALUE, inline: true },
            { name: 'ㅤ', value: '**📖백스토리**\n' + backstory, inline: false },
            { name: 'ㅤ', value: '**🛡장비목록**\n' + equip, inline: false },
        )

    await message.channel.sendTyping();
    await message.channel.send({ embeds: [embed]});
    await message.channel.sendTyping();
    await message.channel.send({ embeds: [embed2]});
    
    return;
};

export const view_all_user_sheet = async(message: Message<boolean>) => {
    if(!(message.content === '!탐사자 시트 요약')) return;

    const user_id_list = await get_all_user_id();

    for(let i = 0; i < user_id_list.length; i++){
        const view_user = await view_user_status(user_id_list[i]);
        const view_ability = await get_ability_status(user_id_list[i]);
        const battle_status = await view_battle_status(user_id_list[i]);
        const equip = await view_equip(user_id_list[i]) ?? NULL_VALUE;

        const embed = new MessageEmbed()
            .setColor('#C171F5')
            .setTitle('👤 탐사자 시트')
            .setThumbnail(view_user.url ?? 'https://png.clipart.me/istock/previews/9349/93493545-people-icon.jpg')
            .addFields(
                { name: '이름', value: view_user.name ?? NULL_VALUE},
                { name: '플레이어', value: '<@' + user_id_list[i] + '>' },
                { name: '직업', value: view_user.job ?? NULL_VALUE, inline: true},
                { name: '나이', value: String(view_user.age ?? NULL_VALUE) , inline: true }, 
                { name: '성별', value: view_user.sex ?? NULL_VALUE, inline: true},
                { name: 'ㅤ', value: '**🛠특수 특성치**', inline: false },
                { name: '🦶🏻이동력', value: String(view_ability[9] ?? NULL_VALUE) , inline: true },
                { name: '🩸HP', value: String(view_ability[10] ?? NULL_VALUE) , inline: true },
                { name: '🔷MP', value: String(view_ability[11] ?? NULL_VALUE) , inline: true },
                { name: '👽이성치', value: String(view_ability[12] ?? NULL_VALUE) , inline: true },
                { name: '🤪광기(일시적,장기적)', value: battle_status[0] ?? NULL_VALUE, inline: true },
                { name: 'ㅤ', value: '**🛡장비목록**\n' + equip, inline: false },
            )

        await message.channel.sendTyping();
        await message.channel.send({ embeds: [embed]});
    }

    return;
};

export const exchange_stat = async(stat: String[]) => {
    let number_stat: number[] = [];

    for(let i = 0; i< 8; i++){
        number_stat[i] = Number(stat[i]) == NaN ? 0 : Number(stat[i]);
    }

    return number_stat;
};

export const view_battle_status = async (user_id: string) => {
    const battle_status = await get_battle_status(user_id);
    
    const mad = battle_status.flatMap((element) => {
        return element.long_mad;
    });
    const dead = battle_status.flatMap((element) => {
        return element.dead;
    });
    const result = [mad[0], dead[0]];

    return result;
};