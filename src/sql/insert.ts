import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create_first_ability = async (user_id: string) => {
    await prisma.ability.create({
        data: {
            user_id: user_id,
            
         },
    })
    return;
}