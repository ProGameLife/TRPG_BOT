import { Message } from "discord.js";
import { upsert_ability } from "./sql/upsert"
import { get_ability } from "./sql/select"

type atrr_ability = {
    dex: number;
    str: number;
    big: number;
    pow: number;
    hel: number;
}[];

let user_stat = {
    start: false,

}
export const set_manual_ability =async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 입력')) return;
    
};

export const set_auto_ability = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 결정')) return;

    await upsert_ability(user_id, 0, 0, 0, 0);
    const extra_ability = await get_ability(user_id);
    set_extra_ability(extra_ability, user_id);
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