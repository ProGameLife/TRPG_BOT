"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsert_uses_skill = exports.upsert_ability = void 0;
const client_1 = require("@prisma/client");
const dice_1 = require("../dice");
const prisma = new client_1.PrismaClient();
const upsert_ability = async (user_id, move, hp_point, mp_point, san) => {
    await prisma.ability.upsert({
        where: { user_id: user_id },
        update: {
            mov: move,
            hp: hp_point,
            mp: mp_point,
            san: san,
        },
        create: {
            user_id: user_id,
            str: (0, dice_1.roll_dice)(3, 6, 0, 0, 5),
            dex: (0, dice_1.roll_dice)(3, 6, 0, 0, 5),
            hel: (0, dice_1.roll_dice)(3, 6, 0, 0, 5),
            idea: (0, dice_1.roll_dice)(2, 6, 6, 0, 5),
            pow: (0, dice_1.roll_dice)(3, 6, 0, 0, 5),
            big: (0, dice_1.roll_dice)(2, 6, 6, 0, 5),
            edu: (0, dice_1.roll_dice)(2, 6, 6, 0, 5),
            look: (0, dice_1.roll_dice)(3, 6, 0, 0, 5),
            luk: (0, dice_1.roll_dice)(3, 6, 0, 0, 5),
            mov: 0,
            hp: 0,
            mp: 0,
            san: 0,
        },
    });
    return;
};
exports.upsert_ability = upsert_ability;
const upsert_uses_skill = async (user_id, skill_name, skill_stat, use_point) => {
    await prisma.skill_uses.upsert({
        select: { user_id: true },
        where: { user_id: user_id },
        create: {
            user_id: user_id,
            use_point: use_point,
            skill_name: skill_name,
            skill_stat: skill_stat,
        },
        update: {
            use_point: use_point,
            skill_name: skill_name,
            skill_stat: skill_stat,
        },
    });
    return;
};
exports.upsert_uses_skill = upsert_uses_skill;
