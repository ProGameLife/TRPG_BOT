import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const delete_user_ability = async (user_id: string) => {
    await prisma.ability.delete({
        where: { user_id: user_id },
    });
    
    return;
};