import { PrismaClient } from "@prisma/client";
import { PermissionOverwriteManager } from "discord.js";
import { roll_dice } from "../dice" 

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
}

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
}

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
}

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
    })
    return get_all_skill_list;
}

export const count_user_skill_list = async (user_id: string) => {
    const count_user_skill = await prisma.skill.count({
        where: { user_id: user_id },
    })
    return count_user_skill;
}