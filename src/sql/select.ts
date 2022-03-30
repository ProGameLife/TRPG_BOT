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
        },
        where: { user_id: user_id },
    });
    return get_all_ability;
}