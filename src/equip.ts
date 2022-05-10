import { Message } from "discord.js";
import { get_equip } from "./sql/select";
import { update_user_equip, update_clear_user_equip } from "./sql/update";

export const make_equip = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content.startsWith('!장비추가'))) return;

    let equip = message.content.substring(message.content.indexOf(' ') + 1);
    const temp = await get_equip(user_id);

    const temp_equip = temp.flatMap((element) => {
        return element.equip;
    });

    if(!(await view_equip(user_id) === '')){
        equip =  temp_equip[0] + ',' + equip;
    }
    
    await update_user_equip(user_id, equip);
    await message.channel.send('장비 입력이 되었습니다. ``!탐사자 시트``으로 내용 확인을 할 수 있습니다. ');

    return;
};

export const clear_equip = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!장비초기화')) return;

    await update_clear_user_equip(user_id);
    await message.channel.send('장비 입력이 초기화 되었습니다. ``!탐사자 시트``으로 내용 확인을 할 수 있습니다. ');

    return;
};

export const view_equip = async (user_id: string) => {
    const data_equip = await get_equip(user_id);
    const equip = data_equip.flatMap((element) => {
        return element.equip;
    });
    
    return equip[0];
};