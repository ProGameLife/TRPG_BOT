import { Message } from "discord.js";
import { get_skill_list, count_user_skill_list } from "./sql/select";
import { create_first_skill } from "./sql/insert";

export const get_user_skill_list = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!스킬목록')) return;
    
    if(await count_user_skill_list(user_id) === 0) create_first_skill(user_id);
    
    const send_skill_list_arr = await make_user_skill_list(user_id);
    
    message.channel.send(send_skill_list_arr[4]);
}

export const make_user_skill_list = async (user_id: string) => {
    const skill_list = await get_skill_list(user_id);
    let result_skill: String[] = []
    const skill_point = skill_list.flatMap((element) => { // 스킬포인트
        return element.skill_point;
    });
    const accounting = skill_list.flatMap((element) => { // 스킬포인트
        return element.accounting
    });
    const anthropology = skill_list.flatMap((element) => { // 스킬포인트
        return element.anthropology
    });
    const archaeology = skill_list.flatMap((element) => { // 스킬포인트
        return element.archaeology
    });
    const art = skill_list.flatMap((element) => { // 스킬포인트
        return element.art
    });
    const astronomy = skill_list.flatMap((element) => { // 스킬포인트
        return element.astronomy
    });
    const bargain = skill_list.flatMap((element) => { // 스킬포인트
        return element.bargain
    });
    const biology = skill_list.flatMap((element) => { // 스킬포인트
        return element.biology
    });
    const chemistry = skill_list.flatMap((element) => { // 스킬포인트
        return element.chemistry
    });
    const climb = skill_list.flatMap((element) => { // 스킬포인트
        return element.climb
    });
    const computer = skill_list.flatMap((element) => { // 스킬포인트
        return element.computer
    });
    const conceal = skill_list.flatMap((element) => { // 스킬포인트
        return element.conceal
    });
    const craft = skill_list.flatMap((element) => { // 스킬포인트
        return element.craft
    });
    const credit_rating = skill_list.flatMap((element) => { // 스킬포인트
        return element.credit_rating
    });
    const cthulhu_mythos = skill_list.flatMap((element) => { // 스킬포인트
        return element.cthulhu_mythos
    });
    const disguise = skill_list.flatMap((element) => { // 스킬포인트
        return element.disguise
    });
    const dodge = skill_list.flatMap((element) => { // 스킬포인트
        return element.dodge
    });
    const drive_automobile = skill_list.flatMap((element) => { // 스킬포인트
        return element.drive_automobile
    });
    const electrical_repair = skill_list.flatMap((element) => { // 스킬포인트
        return element.electrical_repair
    });
    const electronics = skill_list.flatMap((element) => { // 스킬포인트
        return element.electronics
    });
    const fast_talk = skill_list.flatMap((element) => { // 스킬포인트
        return element.fast_talk
    });
    const first_aid = skill_list.flatMap((element) => { // 스킬포인트
        return element.first_aid
    });
    const geology = skill_list.flatMap((element) => { // 스킬포인트
        return element.geology
    });
    const hide = skill_list.flatMap((element) => { // 스킬포인트
        return element.hide
    });
    const history = skill_list.flatMap((element) => { // 스킬포인트
        return element.history
    });
    const jump = skill_list.flatMap((element) => { // 스킬포인트
        return element.jump
    });
    const law = skill_list.flatMap((element) => { // 스킬포인트
        return element.law
    });
    const library_use = skill_list.flatMap((element) => { // 스킬포인트
        return element.library_use
    });
    const listener = skill_list.flatMap((element) => { // 스킬포인트
        return element.listener
    });
    const locksmith = skill_list.flatMap((element) => { // 스킬포인트
        return element.locksmith
    });
    const martial_arts = skill_list.flatMap((element) => { // 스킬포인트
        return element.martial_arts
    });
    const mechanical_repair = skill_list.flatMap((element) => { // 스킬포인트
        return element.mechanical_repair
    });
    const medicine = skill_list.flatMap((element) => { // 스킬포인트
        return element.medicine
    });
    const natural_history = skill_list.flatMap((element) => { // 스킬포인트
        return element.natural_history
    });
    const navigate = skill_list.flatMap((element) => { // 스킬포인트
        return element.navigate
    });
    const occult = skill_list.flatMap((element) => { // 스킬포인트
        return element.occult
    });
    const operate_heavy_machine = skill_list.flatMap((element) => { // 스킬포인트
        return element.operate_heavy_machine
    });
    const other_language = skill_list.flatMap((element) => { // 스킬포인트
        return element.other_language
    });
    const own_language = skill_list.flatMap((element) => { // 스킬포인트
        return element.own_language
    });
    const photography = skill_list.flatMap((element) => { // 스킬포인트
        return element.photography
    });
    const physics = skill_list.flatMap((element) => { // 스킬포인트
        return element.physics
    });
    const pilot = skill_list.flatMap((element) => { // 스킬포인트
        return element.pilot
    });
    const aircraft_control = skill_list.flatMap((element) => { // 스킬포인트
        return element.aircraft_control
    });
    const ship_control = skill_list.flatMap((element) => { // 스킬포인트
        return element.ship_control
    });
    const psychoanalysis = skill_list.flatMap((element) => { // 스킬포인트
        return element.psychoanalysis
    });
    const psychology = skill_list.flatMap((element) => { // 스킬포인트
        return element.psychology
    });
    const ride = skill_list.flatMap((element) => { // 스킬포인트
        return element.ride
    });
    const sneak = skill_list.flatMap((element) => { // 스킬포인트
        return element.sneak
    });
    const swim = skill_list.flatMap((element) => { // 스킬포인트
        return element.swim
    });
    const throws = skill_list.flatMap((element) => { // 스킬포인트
        return element.throw
    });
    const track = skill_list.flatMap((element) => { // 스킬포인트
        return element.track
    });
    const handgun = skill_list.flatMap((element) => { // 스킬포인트
        return element.handgun
    });
    const machine_gun = skill_list.flatMap((element) => { // 스킬포인트
        return element.machine_gun
    });
    const rifle = skill_list.flatMap((element) => { // 스킬포인트
        return element.rifle
    });
    const shotgun = skill_list.flatMap((element) => { // 스킬포인트
        return element.shotgun
    });
    const submachine_gun = skill_list.flatMap((element) => { // 스킬포인트
        return element.submachine_gun
    });
    const fist_punch = skill_list.flatMap((element) => { // 스킬포인트
        return element.fist_punch
    });
    const grapple = skill_list.flatMap((element) => { // 스킬포인트
        return element.grapple
    });
    const head_buff = skill_list.flatMap((element) => { // 스킬포인트
        return element.head_buff
    });
    const kick = skill_list.flatMap((element) => { // 스킬포인트
        return element.kick
    });
    const observation = skill_list.flatMap((element) => { // 스킬포인트
        return element.observation
    });
    const charm = skill_list.flatMap((element) => { // 스킬포인트
        return element.charm
    });

    return result_skill[
        skill_point[0], accounting[0], anthropology[0], archaeology[0], art[0], astronomy[0], bargain[0], biology[0],
        chemistry[0], climb[0], computer[0], conceal[0], craft[0], credit_rating[0], cthulhu_mythos[0], disguise[0],
        dodge[0], drive_automobile[0], electrical_repair[0], electronics[0], fast_talk[0], first_aid[0], geology[0], 
        hide[0], history[0], jump[0], law[0], library_use[0], listener[0], locksmith[0], martial_arts[0], mechanical_repair[0], 
        medicine[0], natural_history[0], navigate[0], occult[0], operate_heavy_machine[0], other_language[0], own_language[0], 
        photography[0], physics[0], pilot[0], aircraft_control[0], ship_control[0], psychoanalysis[0], psychology[0], ride[0], 
        sneak[0], swim[0], throws[0], track[0], handgun[0], machine_gun[0], rifle[0], shotgun[0], submachine_gun[0], fist_punch[0], 
        grapple[0], head_buff[0], kick[0], observation[0], charm[0]
    ]
};