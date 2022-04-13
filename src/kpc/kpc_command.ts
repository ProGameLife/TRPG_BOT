import { Message } from "discord.js";
import { get_user_status } from "../sql/select";
import { update_kpc_ability, update_kpc_dead, update_kpc_mad } from "../sql/update";

const number_regexp = /\d/;
export const edit_user_ability = async (message: Message<boolean>) => {
    const command = message.content.split(' '); // user_id[0] 이성치[1] 45[2]
    const user_id = command[1];
    if(!number_regexp.test(user_id)) return;

    const ability = command[2].toUpperCase();
    const stat = command[3];
    const pmc_status = await get_user_status(user_id);
    const user_name = pmc_status.flatMap((element) => {
        return element.p_name;
    });
    
    let scope = 0;

    switch(ability){
        case '근력':
            scope = 0;
            break;
        case '건강':
            scope = 1;
            break;
        case '크기':
            scope = 2;
            break;
        case '민첩성':
            scope = 3;
            break;
        case '외모':
            scope = 4;
            break;
        case '지능':
            scope = 5;
            break;
        case '정신력':
            scope = 6;
            break;
        case '교육':
            scope = 7;
            break;
        case '운':
            scope = 8;
            break;
        case '이동력':
            scope = 9;
            break;
        case 'HP':
            scope = 10;
            break;
        case 'MP':
            scope = 11;
            break;
        case '이성치':
            scope = 12;
            break;
        case '광기':
            scope = 13;
            break;
        case '빈사':
            scope = 14;
            break;
        case '':
            scope = 15;
            break;
    }

    if(scope < 13){
        await update_kpc_ability(user_id, Number(stat), scope);
        await message.channel.send(user_name + ' 가 ' + ability +' 을(를) ' + stat + ' 으로 변경 하였씁니다.');
    }
    if(scope === 13){
        await update_kpc_mad(user_id, stat);
        await message.channel.send(user_name + ' 의 광기 상태가 ' + stat + ' 으로 변경 하였씁니다.');
    }
    if(scope === 14){
        await update_kpc_dead(user_id, stat);
        await message.channel.send(user_name + ' 의 상태가 ' + stat + ' 으로 변경 하였씁니다.');
    }
    if(scope === 15){
        
    }
};