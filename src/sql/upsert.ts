import { PrismaClient } from "@prisma/client";
import { roll_dice } from "../dice" 

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
};