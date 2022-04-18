import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const delete_user_ability = async (user_id: string) => {
    await prisma.ability.delete({
        where: { user_id: user_id },
    });
    
    return;
};

export const delete_user_all = async (user_id: string) => {
    await prisma.ability.delete({
        where: { user_id: user_id },
    });
    await prisma.skill.delete({
        where: { user_id: user_id },
    });
    await prisma.user_status.delete({
        where: { user_id: user_id },
    });
    await prisma.skill_uses.delete({
        where: { user_id: user_id },
    });
    
    return;
}