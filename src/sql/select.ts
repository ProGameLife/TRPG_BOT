import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const get_ability = async (user_id: string) => {
    const get_ability = await prisma.ability.findMany({
        select: {
            dex: true,
            str: true,
            big: true,
            pow: true,
            hel: true,
        },
        where: { user_id: user_id },
    });

    return get_ability;
};

export const get_all_user_id = async () => {
    const get_all_user_id = await prisma.ability.findMany({
        select: {
            user_id: true,
        },
    });

    const user_id_list = get_all_user_id.flatMap((element) => {
        return element.user_id;
    })

    return user_id_list;
}

export const get_ability_idea = async (user_id: string) => {
    const get_ability_idea = await prisma.ability.findMany({
        select: {
            idea: true,
        },
        where: { user_id: user_id },
    });
    const result = get_ability_idea.flatMap((element) => {
        return element.idea;
    });

    return result[0];
};

export const get_manual_ability = async (user_id: string) => {
    const get_ability = await prisma.ability.findMany({
        select: {
            dex: true,
            str: true,
            big: true,
            pow: true,
            hel: true,
        },
        where: { user_id: user_id },
    });

    return get_ability;
};

export const get_all_ability = async (user_id: string) => {
    const get_all_ability = await prisma.ability.findMany({
        select: {
            str: true,
            hel: true,
            big: true,
            dex: true,
            look: true,
            idea: true,
            pow: true,
            edu: true,
            luk: true,
            mov: true,
            hp: true,
            mp: true,
            san: true,
        },
        where: { user_id: user_id },
    });

    return get_all_ability;
};

export const get_count_user_skill_list = async (user_id: string) => {
    const count_user_skill = await prisma.skill.count({
        where: { user_id: user_id },
    });

    return count_user_skill;
};

export const get_skill_point = async (user_id: string) => {
    const skill_point = await prisma.skill.findMany({
        select: { skill_point: true },
        where: { user_id: user_id},
    });
    const result = skill_point.flatMap((element) => {
        return element.skill_point;
    });

    return result[0];
};

export const get_uses_skill_list = async (user_id: string) => {
    const uses_skill_list = await prisma.skill_uses.findMany({
        select: { 
            use_point: true,
            skill_name: true,
            skill_stat: true,
        },
        where: {
            user_id: user_id,
        },
    });

    return uses_skill_list;
};

export const get_count_uses_skill_list = async (user_id: string) => {
    const count_uses_skill = await prisma.skill_uses.count({
        where: { user_id: user_id },
    });

    return count_uses_skill;
};

export const get_count_user_status = async (user_id: string) => {
    const count_user_status = await prisma.user_status.count({
        where: { user_id: user_id },
    });

    return count_user_status;
};

export const get_user_status = async (user_id: string) => {
    const user_status = await prisma.user_status.findMany({
        select: {
            p_name: true,
            p_sex: true,
            p_job: true,
            p_age: true,
            image_link: true,
            back_story: true,
            equip: true,
        },
        where: { user_id: user_id },
    });

    return user_status;
};

export const get_count_backstory = async (user_id: string) => {
    const user_backstroty = await prisma.user_status.count({
        where: { user_id: user_id },
    });

    return user_backstroty;
};

export const get_backstory = async (user_id: string) => {
    const backstory = await prisma.user_status.findMany({
        select: { back_story: true },
        where: { user_id: user_id },
    });

    return backstory;
};

export const get_equip = async (user_id: string) => {
    const equip = await prisma.user_status.findMany({
        select: { equip: true },
        where: { user_id: user_id },
    });

    return equip;
};

export const get_count_equip = async (user_id: string) => {
    const user_backstroty = await prisma.user_status.count({
        where: { user_id: user_id },
    });

    return user_backstroty;
};

export const get_count_battle_status = async (user_id: string) => {
    const user_battle_status = await prisma.battle_status.count({
        where: { user_id: user_id },
    });

    return user_battle_status;
};

export const get_battle_status = async (user_id: string) => {
    const user_battle_status = await prisma.battle_status.findMany({
        select: {
            physique: true,
            bonus_attack: true,
            long_mad: true,
            dead: true,
        },
        where: { user_id: user_id },
    });

    return user_battle_status;
};

export const get_skill_list = async (user_id: string) => {
    const get_all_skill_list = await prisma.skill.findMany({
        select: {
            skill_point: true,
            accounting: true,
            anthropology: true,
            archaeology: true,
            art: true,
            astronomy: true,
            bargain: true,
            biology: true,
            chemistry: true,
            climb: true,
            computer: true,
            conceal: true,
            craft: true,
            credit_rating: true,
            cthulhu_mythos: true,
            disguise: true,
            dodge: true,
            drive_automobile: true,
            electrical_repair: true,
            electronics: true,
            fast_talk: true,
            first_aid: true,
            geology: true,
            hide: true,
            history: true,
            jump: true,
            law: true,
            library_use: true,
            listener: true,
            locksmith: true,
            martial_arts: true,
            mechanical_repair: true,
            medicine: true,
            natural_history: true,
            navigate: true,
            occult: true,
            operate_heavy_machine: true,
            other_language: true,
            own_language: true,
            persuade: true,
            photography: true,
            physics: true,
            pilot: true,
            aircraft_control: true,
            math: true,
            ship_control: true,
            psychoanalysis: true,
            psychology: true,
            ride: true,
            sneak: true,
            swim: true,
            throw: true,
            track: true,
            handgun: true,
            machine_gun: true,
            rifle: true,
            shotgun: true,
            submachine_gun: true,
            fist_punch: true,
            grapple: true,
            head_buff: true,
            kick: true,
            observation: true,
            charm: true,
        },
        where: { user_id: user_id },
    });
    
    return get_all_skill_list;
};