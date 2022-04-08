"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view_backstory = exports.make_backstory = void 0;
const select_1 = require("./sql/select");
const update_1 = require("./sql/update");
const make_backstory = async (message, user_id) => {
    if (!(message.content.startsWith('!백스토리입력')))
        return;
    let backstory = message.content.substring(message.content.indexOf(' ') + 1);
    backstory = backstory.replaceAll('.', '\n');
    (0, update_1.update_user_backstory)(user_id, backstory);
    message.channel.send('백스토리 입력이 되었습니다. ``!탐사자 시트``으로 내용 확인을 할 수 있습니다. ');
};
exports.make_backstory = make_backstory;
const view_backstory = async (user_id) => {
    const data_backstory = await (0, select_1.get_backstory)(user_id);
    const backstory = data_backstory.flatMap((element) => {
        return element.back_story;
    });
    return backstory[0];
};
exports.view_backstory = view_backstory;
