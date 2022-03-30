import { Message } from "discord.js";
import { upsert_ability } from "./sql/upsert";
import { get_ability } from "./sql/select";
import { create_first_ability } from "./sql/insert";
import { update_one_ability } from "./sql/update";
import { get_ability_status, ability_stat} from "./utill/utill";
import { delete_user_ability } from "./sql/delete";

type atrr_ability = {
    dex: number;
    str: number;
    big: number;
    pow: number;
    hel: number;
}[];



export const set_manual_ability = async (message: Message<boolean>, user_id: string) => {
    if(ability_stat.start === false) return;
    console.log('2222 : ' + ability_stat);
    const manual_ability_command = message.content.split(' ');
    let scope = 0;
    console.log(' 특성치 입력 : ' + manual_ability_command[0] + manual_ability_command[1]);
    switch(manual_ability_command[0]){
        case '!근력':
            ability_stat.check = true;
            scope = 0
            break;
        case '!건강':
            ability_stat.check = true;
            scope = 1
            break;
        case '!크기':
            ability_stat.check = true;
            scope = 2
            break;
        case '!민첩성':
            ability_stat.check = true;
            scope = 3
            break;
        case '!민첩':
            ability_stat.check = true;
            scope = 3
            break;
        case '!외모':
            ability_stat.check = true;
            scope = 4
            break;
        case '!지능':
            ability_stat.check = true;
            scope = 5
            break;
        case '!정신력':
            ability_stat.check = true;
            scope = 6
            break;
        case '!교육':
            ability_stat.check = true;
            scope = 7
            break;
        case '!운':
            ability_stat.check = true;
            scope = 8
            break;
    }
    if(ability_stat.check){
        await update_one_ability(user_id, Number(manual_ability_command[1]), scope);
        await message.channel.send(manual_ability_command[0].substring(1) + '을 ' + manual_ability_command[1] + '로 설정하였습니다.');
    }
    ability_stat.check = false;
    return;
};

export const check_manual_ability = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 확인')) return;

    const status = await get_ability_status(user_id);
    await message.channel.send(
        '>>> <@' + user_id + '> 님의 현재 적용된 특성입니다. \n' +
        '근력 : ' + status[0] + '    건강 : ' + status[1] + '\n' +
        '크기 : ' + status[2] + '    민첩 : ' + status[3] + '\n' +
        '외모 : ' + status[4] + '    지능 : ' + status[5] + '\n' +
        '정신력 : ' + status[6] + '   교육 : ' + status[7] + '\n' +
        '운 : ' + status[8] 
    );
};

export const clear_manual_ability = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 입력 완료')) return;
    ability_stat.start = false;
    message.channel.send('특성치 입력이 끝났습니다.\n``!특성치 확인``을 입력하여 확인 하신 후 ``!가이드`` 명령어로 다음단계를 진행하시오');
}

export const set_auto_ability = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 결정')) return;

    await upsert_ability(user_id, 0, 0, 0, 0);
    const extra_ability = await get_ability(user_id);
    set_extra_ability(extra_ability, user_id);
    message.channel.send('랜덤 특성치가 설정되었습니다. ``!특성치 확인`` 명령어로 확인 하시오');
}

export const set_extra_ability = async (extra_ability: atrr_ability, user_id: string) => {
    const move = extra_ability.flatMap((element) => {
        if(element.dex < element.big && element.str < element.big) return 7;
        if(element.dex >= element.big || element.str >= element.big) return 8;
        if(element.dex > element.big && element.str > element.big) return 9;
    });
    const san = extra_ability.flatMap((element) => {
        return element.pow;
    });
    const hp = extra_ability.flatMap((element) => {
        return Math.floor((element.hel + element.big) / 10);
    });
    await upsert_ability(user_id, Number(move), hp[0], Math.floor(san[0] * 0.2), san[0]);
}

export const delete_ability = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 삭제')) return;
    delete_user_ability(user_id);
    message.channel.send('특성치를 삭제하였습니다.');
}