import { Message, MessageEmbed, } from "discord.js";
import { get_ability_status } from "../ability";
import { view_user_status } from "../job";
import { view_uses_skill_list } from "../skill";
import { view_backstory } from "../backstory";
import { view_equip } from "../equip";

export const view_user_sheet = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!탐사자 시트')) return;

    const view_ability = await get_ability_status(user_id);
    const view_skill = await view_uses_skill_list(user_id);
    const view_user = await view_user_status(user_id);
    const number_of_stat = await exchange_stat(view_skill.uses_skill_stat);
    const backstory = await view_backstory(user_id);
    const equip = await view_equip(user_id);

    const embed = new MessageEmbed()
        .setColor('#C171F5')
        .setTitle('👤 탐사자 시트')
        .setThumbnail(view_user.url ?? 'https://png.clipart.me/istock/previews/9349/93493545-people-icon.jpg')
        .addFields(
            { name: '이름', value: view_user.name ?? '???'},
            { name: '플레이어', value: '<@' + user_id + '>' },
            { name: '직업', value: view_user.job ?? '???', inline: true},
            { name: '나이', value: String(view_user.age) ?? '??', inline: true }, 
            { name: '성별', value: view_user.sex ?? '???', inline: true},
            { name: 'ㅤ', value: '**🔧특성치**', inline: false},
            { name: '💪근력', value: String(view_ability[0]) + '/' +String(Math.floor(view_ability[0] / 2)) + '/' +String(view_ability[0] * 0.2), inline: true },
            { name: '🫀건강', value: String(view_ability[1]) + '/' +String(Math.floor(view_ability[1] / 2)) + '/' +String(view_ability[1] * 0.2), inline: true },
            { name: '📏크기', value: String(view_ability[2]) + '/' +String(Math.floor(view_ability[2] / 2)) + '/' +String(view_ability[2] * 0.2), inline: true },
            { name: '👢민첩성', value: String(view_ability[3]) + '/' +String(Math.floor(view_ability[3] / 2)) + '/' +String(view_ability[3] * 0.2), inline: true },
            { name: '🌹외모', value: String(view_ability[4]) + '/' +String(Math.floor(view_ability[4] / 2)) + '/' +String(view_ability[4] * 0.2), inline: true },
            { name: '🧠지능', value: String(view_ability[5]) + '/' +String(Math.floor(view_ability[5] / 2)) + '/' +String(view_ability[5] * 0.2), inline: true },
            { name: '😫정신력', value: String(view_ability[6]) + '/' +String(Math.floor(view_ability[6] / 2)) + '/' +String(view_ability[6] * 0.2), inline: true },
            { name: '📓교육', value: String(view_ability[7]) + '/' +String(Math.floor(view_ability[7] / 2)) + '/' +String(view_ability[7] * 0.2), inline: true },
            { name: '🍀운', value: String(view_ability[8]), inline: true },
            { name: 'ㅤ', value: '**🛠특수 특성치**', inline: false },
            { name: '🦶🏻이동력', value: String(view_ability[9]), inline: true },
            { name: '🩸HP', value: String(view_ability[10]), inline: true },
            { name: '🔷MP', value: String(view_ability[11]), inline: true },
            { name: '👽이성치', value: String(view_ability[12]), inline: true },
            { name: '🤪광기(일시적,장기적)', value: '``X``', inline: true },
            { name: 'ㅤ', value: '**🗡전투 특성치**', inline: false },
            { name: '👊피해 보너스', value: '없음', inline: true },
            { name: '🏃회피', value: String(Math.floor(view_ability[3] / 2)), inline: true },
            { name: '💀빈사(의식불명)', value: '``X``', inline: true },
        )

    const embed2 = new MessageEmbed()
        .setColor('#C171F5')
        .addFields(
            { name: '**기능목록**', value: 'ㅤ', inline: false },
            { name: view_skill.uses_skill_name[0] ?? '빈스킬', value: view_skill.uses_skill_stat[0] + ' / ' + String(Math.floor(number_of_stat[0] / 2)) + ' / ' + String(number_of_stat[0] * 0.2) ?? '-', inline: true },
            { name: view_skill.uses_skill_name[1] ?? '빈스킬', value: view_skill.uses_skill_stat[1] + ' / ' + String(Math.floor(number_of_stat[1] / 2)) + ' / ' + String(number_of_stat[1] * 0.2) ?? '-', inline: true },
            { name: view_skill.uses_skill_name[2] ?? '빈스킬', value: view_skill.uses_skill_stat[2] + ' / ' + String(Math.floor(number_of_stat[2] / 2)) + ' / ' + String(number_of_stat[2] * 0.2) ?? '-', inline: true },
            { name: view_skill.uses_skill_name[3] ?? '빈스킬', value: view_skill.uses_skill_stat[3] + ' / ' + String(Math.floor(number_of_stat[3] / 2)) + ' / ' + String(number_of_stat[3] * 0.2) ?? '-', inline: true },
            { name: view_skill.uses_skill_name[4] ?? '빈스킬', value: view_skill.uses_skill_stat[4] + ' / ' + String(Math.floor(number_of_stat[4] / 2)) + ' / ' + String(number_of_stat[4] * 0.2) ?? '-', inline: true },
            { name: view_skill.uses_skill_name[5] ?? '빈스킬', value: view_skill.uses_skill_stat[5] + ' / ' + String(Math.floor(number_of_stat[5] / 2)) + ' / ' + String(number_of_stat[5] * 0.2) ?? '-', inline: true },
            { name: view_skill.uses_skill_name[6] ?? '빈스킬', value: view_skill.uses_skill_stat[6] + ' / ' + String(Math.floor(number_of_stat[6] / 2)) + ' / ' + String(number_of_stat[6] * 0.2) ?? '-', inline: true },
            { name: view_skill.uses_skill_name[7] ?? '빈스킬', value: view_skill.uses_skill_stat[7] + ' / ' + String(Math.floor(number_of_stat[7] / 2)) + ' / ' + String(number_of_stat[7] * 0.2) ?? '-', inline: true },
            { name: 'ㅤ', value: '**📖백스토리**\n' + backstory, inline: false },
            { name: 'ㅤ', value: '**🛡장비목록**\n' + equip, inline: false },
        )

    await message.channel.sendTyping();
    await message.channel.send({ embeds: [embed]});
    await message.channel.send({ embeds: [embed2]});
};

export const exchange_stat = async(stat: String[]) => {
    let number_stat: number[] = [];
    stat.forEach((element) => {
        number_stat.push(Number(element));
    });

    return number_stat;
};