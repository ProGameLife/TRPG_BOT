"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_first_battle_status = exports.create_first_user_status = exports.create_first_skill = exports.create_first_ability = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create_first_ability = async (user_id) => {
    await prisma.ability.create({
        data: {
            user_id: user_id,
        },
    });
    return;
};
exports.create_first_ability = create_first_ability;
const create_first_skill = async (user_id, skill_point) => {
    await prisma.skill.create({
        data: {
            user_id: user_id,
            skill_point: skill_point,
        },
    });
    return;
};
exports.create_first_skill = create_first_skill;
const create_first_user_status = async (user_id) => {
    await prisma.user_status.create({
        data: {
            user_id: user_id,
        },
    });
    return;
};
exports.create_first_user_status = create_first_user_status;
const create_first_battle_status = async (user_id) => {
    await prisma.battle_status.create({
        data: {
            user_id: user_id,
        },
    });
};
exports.create_first_battle_status = create_first_battle_status;
