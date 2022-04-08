"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view_equip = exports.clear_equip = exports.make_equip = void 0;
const select_1 = require("./sql/select");
const update_1 = require("./sql/update");
const make_equip = async (message, user_id) => {
    if (!(message.content.startsWith('!장비추가')))
        return;
    let equip = message.content.substring(message.content.indexOf(' ') + 1);
    const temp = await (0, select_1.get_equip)(user_id);
    const temp_equip = temp.flatMap((element) => {
        return element.equip;
    });
    if (!(await (0, exports.view_equip)(user_id) === '')) {
        equip = temp_equip[0] + ',' + equip;
    }
    await (0, update_1.update_user_equip)(user_id, equip);
    message.channel.send('장비 입력이 되었습니다. ``!탐사자 시트``으로 내용 확인을 할 수 있습니다. ');
};
exports.make_equip = make_equip;
const clear_equip = async (message, user_id) => {
    if (!(message.content === '!장비초기화'))
        return;
    await (0, update_1.update_clear_user_equip)(user_id);
    message.channel.send('장비 입력이 초기화 되었습니다. ``!탐사자 시트``으로 내용 확인을 할 수 있습니다. ');
};
exports.clear_equip = clear_equip;
const view_equip = async (user_id) => {
    const data_equip = await (0, select_1.get_equip)(user_id);
    const equip = data_equip.flatMap((element) => {
        return element.equip;
    });
    return equip[0];
};
exports.view_equip = view_equip;
