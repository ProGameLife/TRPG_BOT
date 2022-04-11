import { Message } from "discord.js";
import { upsert_ability } from "./sql/upsert";
import { update_one_ability } from "./sql/update";
import { delete_user_ability } from "./sql/delete";
import { get_ability, get_all_ability } from "./sql/select";

type atrr_ability = {
    dex: number;
    str: number;
    big: number;
    pow: number;
    hel: number;
}[];

export let ability_stat = {
    stack: 0,
    start: false,
    check: false,
}

export const set_manual_ability = async (message: Message<boolean>, user_id: string) => {
    if(ability_stat.start) return;
    const manual_ability_command = message.content.split(' ');
    let scope = 0;

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
    return;
};

export const clear_manual_ability = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 입력 완료')) return;

    const status = await get_ability_status(user_id);
    
    for(let i = 0; i < 8; i++){ //이동력이나 체력 엠피 이성치는 빼고 해야하기 때문에 8로 설정
        if(!(status[i] === 0)) ability_stat.stack += 1;
    }
    if(!(ability_stat.stack === 9)) {// 0~8 = 9이기 때문
        await message.channel.send('특성이 아직 모두 입력되지 않았습니다. ``!특성치 확인``명령어로 확인 하십시오');
        ability_stat.stack = 0;
        return;
    }

    const extra_ability = await get_ability(user_id);
    set_extra_ability(extra_ability,user_id);
    ability_stat.start = false;
    ability_stat.stack = 0;
    await message.channel.send('특성치 입력이 끝났습니다.\n``!탐사자 시트``를 입력하여 확인 하신 후 ``!가이드`` 명령어로 다음단계를 진행하시오');

    return;
};

export const set_auto_ability = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 결정')) return;

    await upsert_ability(user_id, 0, 0, 0, 0);
    const extra_ability = await get_ability(user_id);
    set_extra_ability(extra_ability, user_id);
    message.channel.send('랜덤 특성치가 설정되었습니다. ``!특성치 확인`` 명령어로 확인 하시오');
    
    return;
};

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

    return;
};

export const delete_ability = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 초기화')) return;
    delete_user_ability(user_id);
    message.channel.send('특성치를 초기화하였습니다.');
    
    return;
};

export const get_ability_status = async (user_id: string) => {
    const user_all_ability = await get_all_ability(user_id);

    const str = user_all_ability.flatMap((element) => {
        return element.str;
    })
    const hel = user_all_ability.flatMap((element) => {
        return element.hel;
    })
    const big = user_all_ability.flatMap((element) => {
        return element.big;
    })
    const dex = user_all_ability.flatMap((element) => {
        return element.dex;
    })
    const look = user_all_ability.flatMap((element) => {
        return element.look;
    })
    const idea = user_all_ability.flatMap((element) => {
        return element.idea;
    })
    const pow = user_all_ability.flatMap((element) => {
        return element.pow;
    })
    const edu = user_all_ability.flatMap((element) => {
        return element.edu;
    })
    const luk = user_all_ability.flatMap((element) => {
        return element.luk;
    })
    const move = user_all_ability.flatMap((element) => {
        return element.mov;
    })
    const hp = user_all_ability.flatMap((element) => {
        return element.hp;
    })
    const mp = user_all_ability.flatMap((element) => {
        return element.mp;
    })
    const san = user_all_ability.flatMap((element) => {
        return element.san;
    })
    
    const result = [
        str[0], 
        hel[0], 
        big[0], 
        dex[0], 
        look[0], 
        idea[0], 
        pow[0], 
        edu[0], 
        luk[0], 
        move[0], 
        hp[0], 
        mp[0], 
        san[0]
    ];

    return result;
};

