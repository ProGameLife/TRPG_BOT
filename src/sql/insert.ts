import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create_first_ability = async (user_id: string) => {
    await prisma.ability.create({
        data: {
            user_id: user_id,
            
         },
    })
    return;
};

export const create_first_skill = async (user_id: string, skill_point: number) => {
    await prisma.skill.create({
        data: {
            user_id: user_id,
            skill_point: skill_point,
        }
    })
};

