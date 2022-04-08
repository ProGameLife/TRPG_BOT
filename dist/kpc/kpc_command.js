"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit_user_ability = void 0;
const update_1 = require("../sql/update");
const edit_user_ability = async (message, kpc_command) => {
    const command = kpc_command.split(' '); // user_id[0] 이성치[1] 45[2]
    const user_id = command[0];
    const ability = command[1].toUpperCase();
    const stat = command[2];
    let scope = 0;
    switch (ability) {
        case '근력':
            scope = 0;
            break;
        case '건강':
            scope = 1;
            break;
        case '크기':
            scope = 2;
            break;
        case '민첩성':
            scope = 3;
            break;
        case '외모':
            scope = 4;
            break;
        case '지능':
            scope = 5;
            break;
        case '정신력':
            scope = 6;
            break;
        case '교육':
            scope = 7;
            break;
        case '운':
            scope = 8;
            break;
        case '이동력':
            scope = 9;
            break;
        case 'HP':
            scope = 10;
            break;
        case 'MP':
            scope = 11;
            break;
        case '이성치':
            scope = 12;
            break;
        case '광기':
            scope = 13;
            break;
        case '빈사':
            scope = 14;
            break;
    }
    if (scope < 13) {
        await (0, update_1.update_kpc_ability)(user_id, Number(stat), scope);
        await message.channel.send('<@' + user_id + '> 의 ' + ability + ' 을(를) ' + stat + ' 으로 변경 하였씁니다.');
    }
};
exports.edit_user_ability = edit_user_ability;
