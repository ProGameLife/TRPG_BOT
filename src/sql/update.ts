import { PrismaClient } from "@prisma/client";
import { get_all_ability } from "./select";
import { get_ability_status } from "../utill/utill"

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
    })
}