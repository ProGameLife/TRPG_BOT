"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_ability_status = exports.delete_ability = exports.set_extra_ability = exports.set_auto_ability = exports.clear_manual_ability = exports.check_manual_ability = exports.set_manual_ability = exports.ability_stat = void 0;
const upsert_1 = require("./sql/upsert");
const select_1 = require("./sql/select");
const update_1 = require("./sql/update");
const delete_1 = require("./sql/delete");
exports.ability_stat = {
    start: false,
    check: false,
    stack: 0,
};
const set_manual_ability = async (message, user_id) => {
    if (exports.ability_stat.start === false)
        return;
    const manual_ability_command = message.content.split(' ');
    let scope = 0;
    switch (manual_ability_command[0]) {
        case '!근력':
            exports.ability_stat.check = true;
            scope = 0;
            break;
        case '!건강':
            exports.ability_stat.check = true;
            scope = 1;
            break;
        case '!크기':
            exports.ability_stat.check = true;
            scope = 2;
            break;
        case '!민첩성':
            exports.ability_stat.check = true;
            scope = 3;
            break;
        case '!민첩':
            exports.ability_stat.check = true;
            scope = 3;
            break;
        case '!외모':
            exports.ability_stat.check = true;
            scope = 4;
            break;
        case '!지능':
            exports.ability_stat.check = true;
            scope = 5;
            break;
        case '!정신력':
            exports.ability_stat.check = true;
            scope = 6;
            break;
        case '!교육':
            exports.ability_stat.check = true;
            scope = 7;
            break;
        case '!운':
            exports.ability_stat.check = true;
            scope = 8;
            break;
    }
    if (exports.ability_stat.check) {
        await (0, update_1.update_one_ability)(user_id, Number(manual_ability_command[1]), scope);
        await message.channel.send(manual_ability_command[0].substring(1) + '을 ' + manual_ability_command[1] + '로 설정하였습니다.');
    }
    exports.ability_stat.check = false;
    return;
};
exports.set_manual_ability = set_manual_ability;
const check_manual_ability = async (message, user_id) => {
    if (!(message.content === '!특성치 확인'))
        return;
    const status = await (0, exports.get_ability_status)(user_id);
    await message.channel.send('>>> <@' + user_id + '> 님의 현재 적용된 특성입니다. \n' +
        '근력 : ' + status[0] + '    건강 : ' + status[1] + '\n' +
        '크기 : ' + status[2] + '    민첩 : ' + status[3] + '\n' +
        '외모 : ' + status[4] + '    지능 : ' + status[5] + '\n' +
        '정신력 : ' + status[6] + '   교육 : ' + status[7] + '\n' +
        '운 : ' + status[8]);
    return;
};
exports.check_manual_ability = check_manual_ability;
const clear_manual_ability = async (message, user_id) => {
    if (!(message.content === '!특성치 입력 완료'))
        return;
    const status = await (0, exports.get_ability_status)(user_id);
    for (let i = 0; i < 8; i++) { //이동력이나 체력 엠피 이성치는 빼고 해야하기 때문에 8로 설정
        if (!(status[i] === 0))
            exports.ability_stat.stack += 1;
    }
    if (!(exports.ability_stat.stack === 9)) { // 0~8 = 9이기 때문
        await message.channel.send('특성이 아직 모두 입력되지 않았습니다. ``!특성치 확인``명령어로 확인 하십시오');
        exports.ability_stat.stack = 0;
        return;
    }
    const extra_ability = await (0, select_1.get_ability)(user_id);
    (0, exports.set_extra_ability)(extra_ability, user_id);
    exports.ability_stat.start = false;
    exports.ability_stat.stack = 0;
    await message.channel.send('특성치 입력이 끝났습니다.\n``!특성치 확인``을 입력하여 확인 하신 후 ``!가이드`` 명령어로 다음단계를 진행하시오');
    return;
};
exports.clear_manual_ability = clear_manual_ability;
const set_auto_ability = async (message, user_id) => {
    if (!(message.content === '!특성치 결정'))
        return;
    await (0, upsert_1.upsert_ability)(user_id, 0, 0, 0, 0);
    const extra_ability = await (0, select_1.get_ability)(user_id);
    (0, exports.set_extra_ability)(extra_ability, user_id);
    message.channel.send('랜덤 특성치가 설정되었습니다. ``!특성치 확인`` 명령어로 확인 하시오');
    return;
};
exports.set_auto_ability = set_auto_ability;
const set_extra_ability = async (extra_ability, user_id) => {
    const move = extra_ability.flatMap((element) => {
        if (element.dex < element.big && element.str < element.big)
            return 7;
        if (element.dex >= element.big || element.str >= element.big)
            return 8;
        if (element.dex > element.big && element.str > element.big)
            return 9;
    });
    const san = extra_ability.flatMap((element) => {
        return element.pow;
    });
    const hp = extra_ability.flatMap((element) => {
        return Math.floor((element.hel + element.big) / 10);
    });
    await (0, upsert_1.upsert_ability)(user_id, Number(move), hp[0], Math.floor(san[0] * 0.2), san[0]);
    return;
};
exports.set_extra_ability = set_extra_ability;
const delete_ability = async (message, user_id) => {
    if (!(message.content === '!특성치 삭제'))
        return;
    (0, delete_1.delete_user_ability)(user_id);
    message.channel.send('특성치를 삭제하였습니다.');
    return;
};
exports.delete_ability = delete_ability;
const get_ability_status = async (user_id) => {
    const user_all_ability = await (0, select_1.get_all_ability)(user_id);
    const str = user_all_ability.flatMap((element) => {
        return element.str;
    });
    const hel = user_all_ability.flatMap((element) => {
        return element.hel;
    });
    const big = user_all_ability.flatMap((element) => {
        return element.big;
    });
    const dex = user_all_ability.flatMap((element) => {
        return element.dex;
    });
    const look = user_all_ability.flatMap((element) => {
        return element.look;
    });
    const idea = user_all_ability.flatMap((element) => {
        return element.idea;
    });
    const pow = user_all_ability.flatMap((element) => {
        return element.pow;
    });
    const edu = user_all_ability.flatMap((element) => {
        return element.edu;
    });
    const luk = user_all_ability.flatMap((element) => {
        return element.luk;
    });
    const move = user_all_ability.flatMap((element) => {
        return element.mov;
    });
    const hp = user_all_ability.flatMap((element) => {
        return element.hp;
    });
    const mp = user_all_ability.flatMap((element) => {
        return element.mp;
    });
    const san = user_all_ability.flatMap((element) => {
        return element.san;
    });
    const result = [str[0], hel[0], big[0], dex[0], look[0], idea[0], pow[0], edu[0], luk[0], move[0], hp[0], mp[0], san[0]];
    return result;
};
exports.get_ability_status = get_ability_status;
