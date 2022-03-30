import { get_all_ability } from "../sql/select";


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
    
    const result = [str[0], hel[0], big[0], dex[0], look[0], idea[0], pow[0], edu[0], luk[0]];
    return result;
};

export let ability_stat = {
    start: false,
    check: false,
    stack: 0,
}