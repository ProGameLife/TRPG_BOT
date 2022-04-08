"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user_ability = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const delete_user_ability = async (user_id) => {
    await prisma.ability.delete({
        where: { user_id: user_id },
    });
    return;
};
exports.delete_user_ability = delete_user_ability;
