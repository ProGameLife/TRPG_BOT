"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.san_dice = exports.roll_dice = exports.set_dice = void 0;
const select_1 = require("./sql/select");
const update_1 = require("./sql/update");
// 주사위 명령어임 !dice
// 기본적으로 주사위 명령어의 형태들 == xDy+z 
const set_dice = async (message) => {
    if (!(message.content.startsWith('!dice')))
        return;
    let result_dice_number = 0;
    const dice_command = message.content.toUpperCase().split(' ');
    dice_command.shift();
    const pos1 = dice_command[0].indexOf('D') + 1;
    const pos2 = dice_command[0].indexOf('+') + 1 === 0 ? dice_command[0].length : dice_command[0].indexOf('+') + 1;
    const times = dice_command[0].substring(0, pos1 - 1);
    const dice_number = dice_command[0].substring(pos1, pos2);
    const extra_number = dice_command[0].substring(pos2, dice_command[0].length) === '' ? '0' : dice_command[0].substring(pos2, dice_command[0].length);
    const result_dice = (0, exports.roll_dice)(Number(times), Number(dice_number), Number(extra_number), result_dice_number, 0);
    await message.reply(dice_command[0] + ' 주사위 결과 : ' + result_dice.toString());
};
exports.set_dice = set_dice;
const roll_dice = (times, dice_number, extra_number, result_dice_number, mul_number) => {
    for (let i = 0; i < times; i++) {
        result_dice_number += Math.floor(Math.random() * dice_number) + 1;
    }
    result_dice_number += extra_number;
    mul_number === 0 ? result_dice_number : result_dice_number *= mul_number;
    return result_dice_number;
};
exports.roll_dice = roll_dice;
const san_dice = async (message, user_id) => {
    if (!(message.content.startsWith('!sandice')))
        return;
    const dice_command = message.content.toUpperCase().split(' ');
    dice_command.shift();
    let result_message = '';
    // 2/3d6 = 1d100을 굴렸을 때 자신의 이성치보다 작으면 2의 이성을 깎고 높으면 3d6만큼 이성을 깎는다
    const user_ability = await (0, select_1.get_all_ability)(user_id);
    const user_san = user_ability.flatMap((element) => {
        return element.san;
    });
    let san = 0;
    const first_dice = (0, exports.roll_dice)(1, 100, 0, 0, 0);
    const pos1 = dice_command[0].indexOf('/') + 1;
    const pos2 = dice_command[0].indexOf('D') + 1;
    const pos3 = dice_command[0].indexOf('+') === -1 ? dice_command[0].length : dice_command[0].indexOf('+');
    const main_san = dice_command[0].substring(0, pos1 - 1);
    if (Number(user_san[0]) >= first_dice) {
        san = user_san[0] - Number(main_san);
        await (0, update_1.update_san)(user_id, san);
        result_message = '주사위 판정 성공!';
    }
    else {
        const times = dice_command[0].substring(pos1, pos2 - 1);
        const dice_number = dice_command[0].substring(pos2, pos3);
        const extra_number = dice_command[0].substring(pos3, dice_command[0].length) === '' ? '0' : dice_command[0].substring(pos3 + 1, dice_command[0].length);
        const result = (0, exports.roll_dice)(Number(times), Number(dice_number), Number(extra_number), 0, 0);
        san = user_san[0] - result;
        await (0, update_1.update_san)(user_id, san);
        result_message = '주사위 판정 실패!\n' + dice_command[0] + ' 주사위 판정을 하여 결과 : ' + result;
    }
    await message.channel.sendTyping();
    await message.channel.send('주사위 결과 : 1d100 = ' + first_dice + result_message);
    await message.channel.sendTyping();
    await message.channel.send('\n 이성이 ' + user_san[0] + ' => ' + san + ' 로 감소합니다.');
};
exports.san_dice = san_dice;
