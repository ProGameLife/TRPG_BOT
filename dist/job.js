"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end_job_command = exports.set_p_url = exports.set_p_sex = exports.set_p_job = exports.set_p_age = exports.set_p_name = exports.view_user_status = void 0;
const select_1 = require("./sql/select");
const update_1 = require("./sql/update");
const view_user_status = async (user_id) => {
    const user_status = await (0, select_1.get_user_status)(user_id);
    const p_name = user_status.flatMap((element) => {
        return element.p_name;
    });
    const p_age = user_status.flatMap((element) => {
        return element.p_age;
    });
    const p_sex = user_status.flatMap((element) => {
        return element.p_sex;
    });
    const p_job = user_status.flatMap((element) => {
        return element.p_job;
    });
    const p_url = user_status.flatMap((element) => {
        return element.image_link;
    });
    const result = {
        name: p_name[0],
        age: p_age[0],
        sex: p_sex[0],
        job: p_job[0],
        url: p_url[0],
    };
    return result;
};
exports.view_user_status = view_user_status;
const set_p_name = async (message, user_id) => {
    if (!(message.content.startsWith('!이름설정')))
        return;
    const p_name = message.content.substring(message.content.indexOf(' ') + 1);
    await (0, update_1.update_p_name)(user_id, p_name);
    await message.channel.send(p_name + '을(를) 이름으로 저장했습니다.');
    return;
};
exports.set_p_name = set_p_name;
const set_p_age = async (message, user_id) => {
    if (!(message.content.startsWith('!나이설정')))
        return;
    const p_age = message.content.substring(message.content.indexOf(' ') + 1);
    await (0, update_1.update_p_age)(user_id, Number(p_age));
    await message.channel.send(p_age + ' 을(를) 나이로 저장했습니다.');
    return;
};
exports.set_p_age = set_p_age;
const set_p_job = async (message, user_id) => {
    if (!(message.content.startsWith('!직업설정')))
        return;
    const p_job = message.content.substring(message.content.indexOf(' ') + 1);
    await (0, update_1.update_p_job)(user_id, p_job);
    await message.channel.send(p_job + ' 을(를) 직업으로 저장했습니다.');
    return;
};
exports.set_p_job = set_p_job;
const set_p_sex = async (message, user_id) => {
    if (!(message.content.startsWith('!성별설정')))
        return;
    const p_sex = message.content.substring(message.content.indexOf(' ') + 1);
    await (0, update_1.update_p_sex)(user_id, p_sex);
    await message.channel.send(p_sex + ' 을(를) 성별로 저장했습니다.');
    return;
};
exports.set_p_sex = set_p_sex;
const set_p_url = async (message, user_id) => {
    if (!(message.content.startsWith('!사진설정')))
        return;
    const p_url = message.content.substring(message.content.indexOf(' ') + 1);
    await (0, update_1.update_p_url)(user_id, p_url);
    await message.channel.send('사진 주소로 저장했습니다.');
    return;
};
exports.set_p_url = set_p_url;
const end_job_command = async (message) => {
    if (!(message.content === '!정보 입력 완료'))
        return;
    await message.channel.send('탐사자 정보 입력이 되었습니다. ``!탐사자 시트`` 명령어로 확인 후 ``!가이드`` 명령어로 계속 진행하세요');
    return;
};
exports.end_job_command = end_job_command;
