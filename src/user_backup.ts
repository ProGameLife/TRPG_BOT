import { Message } from "discord.js";
import { 
    get_all_ability,
    get_user_status,
    get_battle_status,
    get_uses_skill_list,
    get_all_user_backup,
    get_tamplate_data,
} from "./sql/select";
import {
    create_user_backup,
} from "./sql/insert";
import { view_user_sheet } from "./view/view";
import { upsert_tamplate } from "./sql/upsert";

export type template_data = {
    str: number;
    dex: number;
    hel: number;
    idea: number;
    pow: number;
    big: number;
    edu: number;
    look: number;
    mov: number;
    luk: number;
    hp: number;
    mp: number;
    san: number;
    use_point: number;
    skill_name: string;
    skill_stat: string;
    name: string;
    age: string;
    job: string;
    sex: string;
    image_link: string;
    equip: string;
    back_story: string;
    bonus_attack: string;
    dead: string;
    long_mad: string;
    physique: string;
}
export type ability = {
    str: number;
    dex: number;
    hel: number;
    idea: number;
    pow: number;
    big: number;
    edu: number;
    look: number;
    mov: number;
    luk: number;
    hp: number;
    mp: number;
    san: number;
}[];

export type uses_skill = {
    use_point: number;
    skill_name: string | null;
    skill_stat: string | null;
}[];

export type user_status = {
    p_name: string;
    p_sex: string;
    p_job: string;
    p_age: string;
    image_link: string;
    back_story: string;
    equip: string;
}[];

export type battle_status = {
    physique: string;
    bonus_attack: string;
    long_mad: string;
    dead: string;
}[];

export const apply_tamplate = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content.startsWith('!템플릿 적용'))) return;
    const command = message.content.split(' ');
    command.shift(); //command[1] 에는 템플릿 번호가 있음

    const taplate_data = await get_tamplate_data(Number(command[1]));

    const str = taplate_data.flatMap((element) => {
        return element!.str;
    });
    const dex = taplate_data.flatMap((element) => {
        return element!.dex;
    });
    const hel = taplate_data.flatMap((element) => {
        return element!.hel;
    });
    const idea = taplate_data.flatMap((element) => {
        return element!.idea;
    });
    const pow = taplate_data.flatMap((element) => {
        return element!.pow;
    });
    const big = taplate_data.flatMap((element) => {
        return element!.big;
    });
    const edu = taplate_data.flatMap((element) => {
        return element!.edu;
    });
    const look = taplate_data.flatMap((element) => {
        return element!.look;
    });
    const mov = taplate_data.flatMap((element) => {
        return element!.mov;
    });
    const luk = taplate_data.flatMap((element) => {
        return element!.luk;
    });
    const hp = taplate_data.flatMap((element) => {
        return element!.hp;
    });
    const mp = taplate_data.flatMap((element) => {
        return element!.mp;
    });
    const san = taplate_data.flatMap((element) => {
        return element!.san;
    });
    const use_point = taplate_data.flatMap((element) => {
        return element!.use_point;
    });
    const skill_name = taplate_data.flatMap((element) => {
        return element!.skill_name;
    });
    const skill_stat = taplate_data.flatMap((element) => {
        return element!.skill_stat;
    });
    const name = taplate_data.flatMap((element) => {
        return element!.p_name;
    });
    const age = taplate_data.flatMap((element) => {
        return element!.p_age;
    });
    const job = taplate_data.flatMap((element) => {
        return element!.p_job;
    });
    const sex = taplate_data.flatMap((element) => {
        return element!.p_sex;
    });
    const image_link = taplate_data.flatMap((element) => {
        return element!.image_link;
    });
    const equip = taplate_data.flatMap((element) => {
        return element!.equip;
    });
    const back_story = taplate_data.flatMap((element) => {
        return element!.back_story;
    });
    const bonus_attack = taplate_data.flatMap((element) => {
        return element!.bonus_attack
    });
    const dead = taplate_data.flatMap((element) => {
        return element!.dead
    });
    const long_mad = taplate_data.flatMap((element) => {
        return element!.long_mad
    });
    const physique = taplate_data.flatMap((element) => {
        return element!.physique
    });

    const result = {
        str: str[0],
        dex: dex[0],
        hel: hel[0], 
        idea: idea[0], 
        pow: pow[0],
        big: big[0],
        edu: edu[0],
        look: look[0],
        mov: mov[0],
        luk: luk[0],
        hp: hp[0],
        mp: mp[0],
        san: san[0],
        use_point: use_point[0], 
        skill_name: skill_name[0] ?? ' ', 
        skill_stat: skill_stat[0] ?? ' ', 
        name: name[0], 
        age: age[0], 
        job: job[0], 
        sex: sex[0], 
        image_link: image_link[0], 
        equip: equip[0], 
        back_story: back_story[0],
        bonus_attack: bonus_attack[0],
        dead: dead[0],
        long_mad: long_mad[0],
        physique: physique[0],
    };
    
    await upsert_tamplate(result, user_id);
    await message.channel.send(command[1] + ' 번의 템플릿을 적용하였습니다. ``!탐사자 시트``로 확인 해주시기 바랍니다.');
    
    return;
};

export const user_backup = async (message: Message<boolean>) => {
    if(!(message.content.startsWith('!템플릿 저장'))) return; 
    const command = message.content.split(' ');
    command.shift();

    const all_ability = await get_all_ability(command[1]);
    const all_skill_uses = await get_uses_skill_list(command[1]);
    const all_user_status = await get_user_status(command[1]);
    const all_battle_status = await get_battle_status(command[1]);

    const result_user_backup_data = await make_user_backup_data(all_ability, all_skill_uses, all_user_status, all_battle_status);
    
    await create_user_backup(result_user_backup_data);
    await message.channel.send('<@' + command[1] + '> 유저의 사용중이던 탐사자 정보가 템플릿에 저장 되었습니다.' );

    return;
};

export const view_user_backup = async (message: Message<boolean>) => {
    if(!(message.content.startsWith('!템플릿 목록'))) return;
    const all_user_backup = await get_all_user_backup();
    
    const id = all_user_backup.flatMap((element) => {
        return element.id;
    });
    const name = all_user_backup.flatMap((element) => {
        return element.p_name;
    });
    const age = all_user_backup.flatMap((element) => {
        return element.p_age;
    });
    const job = all_user_backup.flatMap((element) => {
        return element.p_job;
    });
    const image = all_user_backup.flatMap((element) => {
        return element.image_link;
    });

    let message_format = '**템플릿번호 / 이름 / 나이 / 직업 / 총' + id.length + ' 개의 템플릿**\n자세히 확인하고 싶은 템플릿은 ``!템플릿 확인 템플릿번호`` 로 확인 하면 됩니다. \n';

    for(let i = 0; i < name.length; i++){
        message_format += '\n``'+ id[i] + '\t' + name[i] + '\t' + age[i] + '\t' + job[i] + '``';
    }

    await message.channel.send('>>> ' + message_format);
}

export const view_tamplate = async (message: Message<boolean>) => {
    if(!(message.content.startsWith('!템플릿 확인'))) return;
    const command = message.content.split(' ');
    command.shift(); // 숫자만 입력했는지 확인 필요

    const taplate_data = await get_tamplate_data(Number(command[1]));

    const str = taplate_data.flatMap((element) => {
        return element!.str;
    });
    const dex = taplate_data.flatMap((element) => {
        return element!.dex;
    });
    const hel = taplate_data.flatMap((element) => {
        return element!.hel;
    });
    const idea = taplate_data.flatMap((element) => {
        return element!.idea;
    });
    const pow = taplate_data.flatMap((element) => {
        return element!.pow;
    });
    const big = taplate_data.flatMap((element) => {
        return element!.big;
    });
    const edu = taplate_data.flatMap((element) => {
        return element!.edu;
    });
    const look = taplate_data.flatMap((element) => {
        return element!.look;
    });
    const mov = taplate_data.flatMap((element) => {
        return element!.mov;
    });
    const luk = taplate_data.flatMap((element) => {
        return element!.luk;
    });
    const hp = taplate_data.flatMap((element) => {
        return element!.hp;
    });
    const mp = taplate_data.flatMap((element) => {
        return element!.mp;
    });
    const san = taplate_data.flatMap((element) => {
        return element!.san;
    });
    const use_point = taplate_data.flatMap((element) => {
        return element!.use_point;
    });
    const skill_name = taplate_data.flatMap((element) => {
        return element!.skill_name;
    });
    const skill_stat = taplate_data.flatMap((element) => {
        return element!.skill_stat;
    });
    const name = taplate_data.flatMap((element) => {
        return element!.p_name;
    });
    const age = taplate_data.flatMap((element) => {
        return element!.p_age;
    });
    const job = taplate_data.flatMap((element) => {
        return element!.p_job;
    });
    const sex = taplate_data.flatMap((element) => {
        return element!.p_sex;
    });
    const image_link = taplate_data.flatMap((element) => {
        return element!.image_link;
    });
    const equip = taplate_data.flatMap((element) => {
        return element!.equip;
    });
    const back_story = taplate_data.flatMap((element) => {
        return element!.back_story;
    });
    const bonus_attack = taplate_data.flatMap((element) => {
        return element!.bonus_attack
    });
    const dead = taplate_data.flatMap((element) => {
        return element!.dead
    });
    const long_mad = taplate_data.flatMap((element) => {
        return element!.long_mad
    });
    const physique = taplate_data.flatMap((element) => {
        return element!.physique
    });

    const result = {
        str: str[0],
        dex: dex[0],
        hel: hel[0], 
        idea: idea[0], 
        pow: pow[0],
        big: big[0],
        edu: edu[0],
        look: look[0],
        mov: mov[0],
        luk: luk[0],
        hp: hp[0],
        mp: mp[0],
        san: san[0],
        use_point: use_point[0], 
        skill_name: skill_name[0] ?? ' ', 
        skill_stat: skill_stat[0] ?? ' ', 
        name: name[0], 
        age: age[0], 
        job: job[0], 
        sex: sex[0], 
        image_link: image_link[0], 
        equip: equip[0], 
        back_story: back_story[0],
        bonus_attack: bonus_attack[0],
        dead: dead[0],
        long_mad: long_mad[0],
        physique: physique[0],
    };

    await view_user_sheet(message, command[0], false, result);
    
    return;
};

const make_user_backup_data = async (ability: ability, uses_skill: uses_skill, user_status: user_status, battle_status: battle_status) => {
    const str = ability.flatMap((element) => {
        return element!.str;
    });
    const dex = ability.flatMap((element) => {
        return element!.dex;
    });
    const hel = ability.flatMap((element) => {
        return element!.hel;
    });
    const idea = ability.flatMap((element) => {
        return element!.idea;
    });
    const pow = ability.flatMap((element) => {
        return element!.pow;
    });
    const big = ability.flatMap((element) => {
        return element!.big;
    });
    const edu = ability.flatMap((element) => {
        return element!.edu;
    });
    const look = ability.flatMap((element) => {
        return element!.look;
    });
    const mov = ability.flatMap((element) => {
        return element!.mov;
    });
    const luk = ability.flatMap((element) => {
        return element!.luk;
    });
    const hp = ability.flatMap((element) => {
        return element!.hp;
    });
    const mp = ability.flatMap((element) => {
        return element!.mp;
    });
    const san = ability.flatMap((element) => {
        return element!.san;
    });
    const use_point = uses_skill.flatMap((element) => {
        return element!.use_point;
    });
    const skill_name = uses_skill.flatMap((element) => {
        return element!.skill_name;
    });
    const skill_stat = uses_skill.flatMap((element) => {
        return element!.skill_stat;
    });
    const name = user_status.flatMap((element) => {
        return element!.p_name;
    });
    const age = user_status.flatMap((element) => {
        return element!.p_age;
    });
    const job = user_status.flatMap((element) => {
        return element!.p_job;
    });
    const sex = user_status.flatMap((element) => {
        return element!.p_sex;
    });
    const image_link = user_status.flatMap((element) => {
        return element!.image_link;
    });
    const equip = user_status.flatMap((element) => {
        return element!.equip;
    });
    const back_story = user_status.flatMap((element) => {
        return element!.back_story;
    });
    const bonus_attack = battle_status.flatMap((element) => {
        return element!.bonus_attack
    });
    const dead = battle_status.flatMap((element) => {
        return element!.dead
    });
    const long_mad = battle_status.flatMap((element) => {
        return element!.long_mad
    });
    const physique = battle_status.flatMap((element) => {
        return element!.physique
    });

    const result = {
        str: str[0],
        dex: dex[0],
        hel: hel[0], 
        idea: idea[0], 
        pow: pow[0],
        big: big[0],
        edu: edu[0],
        look: look[0],
        mov: mov[0],
        luk: luk[0],
        hp: hp[0],
        mp: mp[0],
        san: san[0],
        use_point: use_point[0], 
        skill_name: skill_name[0] ?? ' ', 
        skill_stat: skill_stat[0] ?? ' ', 
        name: name[0], 
        age: age[0], 
        job: job[0], 
        sex: sex[0], 
        image_link: image_link[0], 
        equip: equip[0], 
        back_story: back_story[0],
        bonus_attack: bonus_attack[0],
        dead: dead[0],
        long_mad: long_mad[0],
        physique: physique[0],
    };

    return result;
};