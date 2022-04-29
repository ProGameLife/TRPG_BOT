import { PrismaClient } from "@prisma/client";
import { roll_dice } from "../dice";
import { template_data } from "../user_backup";

const prisma = new PrismaClient();

export const upsert_ability = async (user_id: string, move: number, hp_point: number, mp_point: number, san: number) => {
    await prisma.ability.upsert({
        where: { user_id: user_id},
        update: { 
            mov: move,
            hp: hp_point,
            mp: mp_point,
            san: san,
        },
        create: { 
            user_id: user_id,
            str: roll_dice(3, 6, 0, 0, 5),
            dex: roll_dice(3, 6, 0, 0, 5),
            hel: roll_dice(3, 6, 0, 0, 5),
            idea: roll_dice(2, 6, 6, 0, 5),
            pow: roll_dice(3, 6, 0, 0, 5),
            big: roll_dice(2, 6, 6, 0, 5),
            edu: roll_dice(2, 6, 6, 0, 5),
            look: roll_dice(3, 6, 0, 0, 5),
            luk: roll_dice(3, 6, 0, 0, 5),
            mov: 0,
            hp: 0,
            mp: 0,
            san: 0,
        },
    });

    return;
};

export const upsert_uses_skill = async (user_id: string, skill_name: string, skill_stat: string, use_point: number) => {
    await prisma.skill_uses.upsert({
        select: { user_id: true },
        where: { user_id: user_id },
        create: {
            user_id: user_id,
            use_point: use_point,
            skill_name: skill_name,
            skill_stat: skill_stat,
        },
        update: {
            use_point: use_point,
            skill_name: skill_name,
            skill_stat: skill_stat,
        },
    });
    
    return;
};

export const upsert_tamplate = async (data: template_data, user_id: string) => {
    await prisma.ability.upsert({
        where: { user_id: user_id },
        create: {
            user_id:user_id,
            str: data.str,
            hel: data.hel,
            big: data.big,
            dex: data.dex,
            look: data.look,
            idea: data.idea,
            pow: data.pow,
            edu: data.edu,
            luk: data.luk,
            mov: data.mov,
            hp: data.hp,
            mp: data.mp,
            san: data.san,
         },
        update: { 
            str: data.str,
            hel: data.hel,
            big: data.big,
            dex: data.dex,
            look: data.look,
            idea: data.idea,
            pow: data.pow,
            edu: data.edu,
            luk: data.luk,
            mov: data.mov,
            hp: data.hp,
            mp: data.mp,
            san: data.san,
        },
    });
    
    await prisma.skill_uses.upsert({
        where: { user_id: user_id },
        create: {
            user_id:user_id,
            use_point: data.use_point,
            skill_name: data.skill_name,
            skill_stat: data.skill_stat,
         },
        update: { 
            use_point: data.use_point,
            skill_name: data.skill_name,
            skill_stat: data.skill_stat,
        },
    });

    await prisma.user_status.upsert({
        where: { user_id: user_id },
        create: {
            user_id:user_id,
            p_name: data.name,
            p_age: data.age,
            p_sex: data.sex,
            p_job: data.job,
            image_link: data.image_link,
            back_story: data.back_story,
            equip: data.equip,
         },
        update: { 
            p_name: data.name,
            p_age: data.age,
            p_sex: data.sex,
            p_job: data.job,
            image_link: data.image_link,
            back_story: data.back_story,
            equip: data.equip,
        },
    });

    await prisma.battle_status.upsert({
        where: { user_id: user_id },
        create: {
            user_id:user_id,
            bonus_attack: data.bonus_attack,
            physique: data.physique,
            long_mad: data.long_mad,
            dead: data.dead,
         },
        update: { 
            bonus_attack: data.bonus_attack,
            physique: data.physique,
            long_mad: data.long_mad,
            dead: data.dead,
        },
    });

    return;
}