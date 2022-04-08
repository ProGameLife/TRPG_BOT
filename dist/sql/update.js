"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_p_url = exports.update_p_job = exports.update_p_sex = exports.update_p_age = exports.update_p_name = exports.update_reset_uses_skill = exports.update_skill_point = exports.update_use_skill_point = exports.update_user_backstory = exports.update_san = exports.update_clear_user_equip = exports.update_user_equip = exports.update_kpc_ability = exports.update_one_ability = void 0;
const client_1 = require("@prisma/client");
const ability_1 = require("../ability");
const select_1 = require("./select");
const prisma = new client_1.PrismaClient();
const update_one_ability = async (user_id, ability, scope) => {
    let value = await (0, ability_1.get_ability_status)(user_id);
    value[scope] = ability;
    await prisma.ability.update({
        where: { user_id: user_id },
        data: {
            str: value[0],
            hel: value[1],
            big: value[2],
            dex: value[3],
            look: value[4],
            idea: value[5],
            pow: value[6],
            edu: value[7],
            luk: value[8],
        },
    });
    return;
};
exports.update_one_ability = update_one_ability;
const update_kpc_ability = async (user_id, ability, scope) => {
    let value = await (0, ability_1.get_ability_status)(user_id);
    value[scope] = ability;
    await prisma.ability.update({
        where: { user_id: user_id },
        data: {
            str: value[0],
            hel: value[1],
            big: value[2],
            dex: value[3],
            look: value[4],
            idea: value[5],
            pow: value[6],
            edu: value[7],
            luk: value[8],
            mov: value[9],
            hp: value[10],
            mp: value[11],
            san: value[12],
        },
    });
    return;
};
exports.update_kpc_ability = update_kpc_ability;
const update_user_equip = async (user_id, equip) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            equip: equip,
        },
    });
};
exports.update_user_equip = update_user_equip;
const update_clear_user_equip = async (user_id) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            equip: '',
        },
    });
};
exports.update_clear_user_equip = update_clear_user_equip;
const update_san = async (user_id, san) => {
    await prisma.ability.update({
        where: { user_id: user_id },
        data: {
            san: san,
        },
    });
};
exports.update_san = update_san;
const update_user_backstory = async (user_id, backstroy) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            back_story: backstroy,
        },
    });
};
exports.update_user_backstory = update_user_backstory;
const update_use_skill_point = async (user_id, use_point) => {
    const temp_point = await (0, select_1.get_skill_point)(user_id);
    await prisma.skill.update({
        where: { user_id: user_id },
        data: {
            skill_point: temp_point - use_point,
        },
    });
    return;
};
exports.update_use_skill_point = update_use_skill_point;
const update_skill_point = async (user_id, skill_point) => {
    await prisma.skill.update({
        where: { user_id: user_id },
        data: {
            skill_point: skill_point,
        },
    });
    return;
};
exports.update_skill_point = update_skill_point;
const update_reset_uses_skill = async (user_id) => {
    await prisma.skill_uses.update({
        where: { user_id: user_id },
        data: {
            use_point: 0,
            skill_name: '',
            skill_stat: ''
        },
    });
    return;
};
exports.update_reset_uses_skill = update_reset_uses_skill;
const update_p_name = async (user_id, p_name) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            p_name: p_name,
        },
    });
    return;
};
exports.update_p_name = update_p_name;
const update_p_age = async (user_id, p_age) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            p_age: p_age,
        },
    });
    return;
};
exports.update_p_age = update_p_age;
const update_p_sex = async (user_id, p_sex) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            p_sex: p_sex,
        },
    });
    return;
};
exports.update_p_sex = update_p_sex;
const update_p_job = async (user_id, p_job) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            p_job: p_job,
        },
    });
    return;
};
exports.update_p_job = update_p_job;
const update_p_url = async (user_id, p_url) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            image_link: p_url,
        },
    });
    return;
};
exports.update_p_url = update_p_url;
