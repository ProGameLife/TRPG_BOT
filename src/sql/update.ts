import { PrismaClient } from "@prisma/client";
import { get_ability_status } from "../ability"
import { get_skill_point } from "./select";

const prisma = new PrismaClient();

export const update_one_ability = async (user_id: string, ability: number, scope: number) => {
    let value = await get_ability_status(user_id)

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

export const update_user_backstory = async (user_id: string, backstroy: string) => {
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            back_story: backstroy,
        },
    });
};

export const update_use_skill_point = async (user_id: string, use_point: number ) => {
    const temp_point = await get_skill_point(user_id);

    await prisma.skill.update({
        where: { user_id: user_id },
        data: {
            skill_point: temp_point - use_point,
        },
    });
    return;
};

export const update_skill_point = async (user_id: string, skill_point: number ) => {
        await prisma.skill.update({
        where: { user_id: user_id },
        data: {
            skill_point: skill_point,
        },
    });
    return;
};

export const update_reset_uses_skill = async (user_id: string) => {
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

export const update_p_name = async (user_id: string, p_name: string) => { // 아름
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            p_name: p_name,
        },
    });
    return;
};

export const update_p_age = async (user_id: string, p_age: number) => { // 나이
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            p_age: p_age,
        },
    });
    return;
};

export const update_p_sex = async (user_id: string, p_sex: string) => { // 성별
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            p_sex: p_sex,
        },
    });
    return;
};

export const update_p_job = async (user_id: string, p_job: string) => { // 직업
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            p_job: p_job,
        },
    });
    return;
};

export const update_p_url = async (user_id: string, p_url: string) => { // 이미지
    await prisma.user_status.update({
        where: { user_id: user_id },
        data: {
            image_link: p_url,
        },
    });
    return;
};