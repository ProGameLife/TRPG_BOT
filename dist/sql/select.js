"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_count_battle_status = exports.get_count_equip = exports.get_equip = exports.get_backstory = exports.get_count_backstory = exports.get_user_status = exports.get_count_user_status = exports.get_count_uses_skill_list = exports.get_uses_skill_list = exports.get_skill_point = exports.get_count_user_skill_list = exports.get_skill_list = exports.get_all_ability = exports.get_manual_ability = exports.get_ability_idea = exports.get_ability = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const get_ability = async (user_id) => {
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
exports.get_ability = get_ability;
const get_ability_idea = async (user_id) => {
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
exports.get_ability_idea = get_ability_idea;
const get_manual_ability = async (user_id) => {
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
exports.get_manual_ability = get_manual_ability;
const get_all_ability = async (user_id) => {
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
exports.get_all_ability = get_all_ability;
const get_skill_list = async (user_id) => {
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
exports.get_skill_list = get_skill_list;
const get_count_user_skill_list = async (user_id) => {
    const count_user_skill = await prisma.skill.count({
        where: { user_id: user_id },
    });
    return count_user_skill;
};
exports.get_count_user_skill_list = get_count_user_skill_list;
const get_skill_point = async (user_id) => {
    const skill_point = await prisma.skill.findMany({
        select: { skill_point: true },
        where: { user_id: user_id },
    });
    const result = skill_point.flatMap((element) => {
        return element.skill_point;
    });
    return result[0];
};
exports.get_skill_point = get_skill_point;
const get_uses_skill_list = async (user_id) => {
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
exports.get_uses_skill_list = get_uses_skill_list;
const get_count_uses_skill_list = async (user_id) => {
    const count_uses_skill = await prisma.skill_uses.count({
        where: { user_id: user_id },
    });
    return count_uses_skill;
};
exports.get_count_uses_skill_list = get_count_uses_skill_list;
const get_count_user_status = async (user_id) => {
    const count_user_status = await prisma.user_status.count({
        where: { user_id: user_id },
    });
    return count_user_status;
};
exports.get_count_user_status = get_count_user_status;
const get_user_status = async (user_id) => {
    const user_status = await prisma.user_status.findMany({
        select: {
            p_name: true,
            p_sex: true,
            p_job: true,
            p_age: true,
            image_link: true,
        },
        where: { user_id: user_id },
    });
    return user_status;
};
exports.get_user_status = get_user_status;
const get_count_backstory = async (user_id) => {
    const user_backstroty = await prisma.user_status.count({
        where: { user_id: user_id },
    });
    return user_backstroty;
};
exports.get_count_backstory = get_count_backstory;
const get_backstory = async (user_id) => {
    const backstory = await prisma.user_status.findMany({
        select: { back_story: true },
        where: { user_id: user_id },
    });
    return backstory;
};
exports.get_backstory = get_backstory;
const get_equip = async (user_id) => {
    const equip = await prisma.user_status.findMany({
        select: { equip: true },
        where: { user_id: user_id },
    });
    return equip;
};
exports.get_equip = get_equip;
const get_count_equip = async (user_id) => {
    const user_backstroty = await prisma.user_status.count({
        where: { user_id: user_id },
    });
    return user_backstroty;
};
exports.get_count_equip = get_count_equip;
const get_count_battle_status = async (user_id) => {
    const user_battle_status = await prisma.battle_status.count({
        where: { user_id: user_id },
    });
    return user_battle_status;
};
exports.get_count_battle_status = get_count_battle_status;
