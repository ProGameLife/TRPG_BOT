import { PrismaClient } from "@prisma/client";
import {
    template_data,
} from "../user_backup";
const prisma = new PrismaClient();

export const create_first_ability = async (user_id: string) => {
    await prisma.ability.create({
        data: {
            user_id: user_id,
            
         },
    });

    return;
};

export const create_first_skill = async (user_id: string, skill_point: number) => {
    await prisma.skill.create({
        data: {
            user_id: user_id,
            skill_point: skill_point,
        },
    });

    return;
};

export const create_first_user_status = async (user_id: string) => {
    await prisma.user_status.create({
        data: {
            user_id: user_id,
        },
    });

    return;
};

export const create_first_battle_status = async (user_id: string) => {
    await prisma.battle_status.create({
        data: {
            user_id: user_id,
        },
    });
    
    return;
};

export const create_user_backup = async (template_data: template_data) => {
    await prisma.user_backup.create({
        data: {
            str: template_data.str,
            hel: template_data.hel,
            big: template_data.big,
            dex: template_data.dex,
            look: template_data.look,
            idea: template_data.idea,
            pow: template_data.pow,
            edu: template_data.edu,
            luk: template_data.luk,
            mov: template_data.mov,
            hp: template_data.hp,
            mp: template_data.mp,
            san: template_data.san,
            use_point: template_data.use_point,
            skill_name: template_data.skill_name,
            skill_stat: template_data.skill_stat,
            p_name: template_data.name,
            p_age: template_data.age,
            p_job: template_data.job,
            p_sex: template_data.sex,
            image_link: template_data.image_link,
            equip: template_data.equip,
            back_story: template_data.back_story,
            bonus_attack: template_data.bonus_attack,
            dead: template_data.dead,
            long_mad: template_data.long_mad,
            physique: template_data.physique,
        },
    });

    return;
};
