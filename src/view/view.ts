import { view_equip } from "../equip";
import { view_user_status } from "../job";
import { view_backstory } from "../backstory";
import { get_ability_status } from "../ability";
import { view_uses_skill_list } from "../skill";
import { get_battle_status, get_play_user_id } from "../sql/select";
import { Message, MessageEmbed, VoiceChannel } from "discord.js";
import { upsert_team } from "../sql/upsert";

const NULL_VALUE = '-';

let equip: string;
let backstory: string;
let view_ability: number[];
let battle_status: string[];
let number_of_stat: number[];
let avoid: number;
let view_user:  {
    name: string;
    age: string;
    sex: string;
    job: string;
    url: string;
};
let view_skill: {
    uses_skill_name: string[];
    uses_skill_stat: string[];
};

const make_tamplate_custom_data = async (view_flag: boolean, custom_data: any, user_id: string) => { //개선이 필요함 ㅡㅡ;
    let result = {};

    if(view_flag){
        let equip = await view_equip(user_id) ?? NULL_VALUE;
        let backstory = await view_backstory(user_id) ?? NULL_VALUE;
        let view_user = await view_user_status(user_id);
        let view_ability = await get_ability_status(user_id);
        let view_skill = await view_uses_skill_list(user_id);
        let battle_status = await view_battle_status(user_id);
        let number_of_stat = await exchange_stat(view_skill.uses_skill_stat);
        let avoid = view_ability[3] ?? 0;
        
        return result = {
            equip: equip,
            backstory: backstory,
            view_user: view_user,
            view_ability: view_ability,
            view_skill: view_skill,
            battle_status: battle_status,
            number_of_stat: number_of_stat,
            avoid: avoid,
        }   
    }else{
        let equip: string = custom_data.equip;
        let backstory: string = custom_data.back_story;
        let view_user = { 
            name: custom_data.name,
            age: custom_data.age,
            sex: custom_data.sex,
            job: custom_data.job,
            url: custom_data.image_link, 
        };
        let view_ability = [
            custom_data.str, 
            custom_data.hel, 
            custom_data.big, 
            custom_data.dex, 
            custom_data.look, 
            custom_data.idea, 
            custom_data.pow, 
            custom_data.edu, 
            custom_data.luk, 
            custom_data.mov, 
            custom_data.hp, 
            custom_data.mp, 
            custom_data.san
        ];
        let view_skill = {
            uses_skill_name: custom_data.skill_name.split(','),
            uses_skill_stat: custom_data.skill_stat.split(','),
        };
        let battle_status = [custom_data.long_mad, custom_data.dead];
        let number_of_stat = await exchange_stat(view_skill.uses_skill_stat);
        let avoid = view_ability[3] ?? 0;
        
        return result = {
            equip: equip,
            backstory: backstory,
            view_user: view_user,
            view_ability: view_ability,
            view_skill: view_skill,
            battle_status: battle_status,
            number_of_stat: number_of_stat,
            avoid: avoid,
        }   
    }
};


export const view_user_sheet = async (message: Message<boolean>, user_id: string, view_flag: boolean, custom_data: any) => {
    const tamplate_all_data = await make_tamplate_custom_data(view_flag, custom_data, user_id);
    let equip = tamplate_all_data.equip;
    let backstory = tamplate_all_data.backstory;
    let view_user = tamplate_all_data.view_user;
    let view_ability = tamplate_all_data.view_ability;
    let view_skill = tamplate_all_data.view_skill;
    let battle_status = tamplate_all_data.battle_status;
    let number_of_stat = tamplate_all_data.number_of_stat;
    let avoid = tamplate_all_data.avoid;
    let player = view_flag ? '<@' + user_id + '>' : '템플릿입니다.';

    console.log('data : ' + equip, backstory, view_ability, view_user, battle_status, number_of_stat, avoid);

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
    
    //'<@' + user_id + '>'
    const embed = new MessageEmbed()
        .setColor('#C171F5')
        .setTitle('👤 탐사자 시트')
        .setThumbnail(view_user.url ?? 'https://png.clipart.me/istock/previews/9349/93493545-people-icon.jpg')
        .addFields(
            { name: '이름', value: view_user.name ?? NULL_VALUE},
            { name: '플레이어', value: player },
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
    if(!(message.content === '!플레이어 요약')) return;
    const voice_id = message.member!.voice.channelId ?? '';
    const user_id_list = await get_play_user_id(voice_id);

    if(user_id_list === ''){
        await message.channel.send('현재 게임에 대한 플레이어 정보가 없습니다. ``!플레이어 추가`` 를 진행해주세요.');
        return;
    }

    const user_id_arr = user_id_list.split(',');
    console.log(user_id_arr);

    for(let i = 0; i < user_id_arr.length; i++){
        const view_user = await view_user_status(user_id_arr[i]);
        const view_ability = await get_ability_status(user_id_arr[i]);
        const battle_status = await view_battle_status(user_id_arr[i]);
        const equip = await view_equip(user_id_arr[i]) ?? NULL_VALUE;

        const embed = new MessageEmbed()
            .setColor('#C171F5')
            .setTitle('👤 탐사자 시트')
            .setThumbnail(view_user.url ?? 'https://png.clipart.me/istock/previews/9349/93493545-people-icon.jpg')
            .addFields(
                { name: '이름', value: view_user.name ?? NULL_VALUE},
                { name: '플레이어', value: '<@' + user_id_arr[i] + '>' },
                { name: '직업', value: view_user.job ?? NULL_VALUE, inline: true},
                { name: '나이', value: view_user.age ?? NULL_VALUE , inline: true }, 
                { name: '성별', value: view_user.sex ?? NULL_VALUE, inline: true},
                { name: 'ㅤ', value: '**🛠주요 특성치**', inline: false },
                { name: '💪근력', value: String(view_ability[0] ?? NULL_VALUE), inline: true },
                { name: '🫀건강', value: String(view_ability[1] ?? NULL_VALUE), inline: true },
                { name: '👢민첩성', value: String(view_ability[3] ?? NULL_VALUE), inline: true },
                { name: '🧠지능', value: String(view_ability[5] ?? NULL_VALUE), inline: true },
                { name: '😫정신력', value: String(view_ability[6] ?? NULL_VALUE), inline: true },
                { name: '📓교육', value: String(view_ability[7] ?? NULL_VALUE), inline: true },
                { name: '🍀운', value: String(view_ability[8] ?? NULL_VALUE), inline: true },
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

export const add_player = async (message: Message<boolean>) => {
    if(!message.content.startsWith('!플레이어 추가')) return;

    const voice_channel_id = message.member!.voice.channelId ?? '';
    const user_id_temp = message.member!.id;
    let user_id = '';
    const user_id_list = await get_play_user_id(voice_channel_id) ?? '';

    if(user_id_list.includes(user_id_temp)){
        await message.channel.send('이미 있는 유저 입니다. 추가가 취소됩니다.');
        return;
    }

    if(user_id_list === ''){
        user_id = user_id_temp;
    }else{
        user_id = user_id_list + ',' + user_id_temp;
    }

    await upsert_team(voice_channel_id, user_id);
    await message.channel.send('해당 채널에 대한 플레이어 정보가 추가 되었습니다.');
    
    return;
}

export const exchange_stat = async(stat: String[]) => {
    let number_stat: number[] = [];
    
    for(let i = 0; i< 8; i++){
        number_stat[i] = stat[i] === undefined ? 0 : Number(stat[i]);
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