import { Message } from "discord.js";
import { update_san } from "./sql/update";
import { get_all_ability } from "./sql/select";
import { sandice_regexp } from "./utill/regexp";
// 주사위 명령어임 !dice
// 기본적으로 주사위 명령어의 형태들 == xDy+z 

export const set_dice = async (message: Message<boolean>) => {
    if(!(message.content.startsWith('!dice'))) return;

    let result_dice_number = 0;
    const dice_command = message.content.toUpperCase().split(' ');
    dice_command.shift();
    
    const pos1 = dice_command[0].indexOf('D') + 1;
    const pos2 = dice_command[0].indexOf('+') + 1 === 0 ? dice_command[0].length : dice_command[0].indexOf('+');
    
    const times = dice_command[0].substring(0, pos1 - 1);
    const dice_number = dice_command[0].substring(pos1, pos2);
    const extra_number = dice_command[0].substring(pos2 + 1, dice_command[0].length) === '' ? '0' : dice_command[0].substring(pos2 + 1, dice_command[0].length);
    
    const result_dice = roll_dice(Number(times), Number(dice_number), Number(extra_number), result_dice_number, 0);
    await message.reply(dice_command[0] + ' 주사위 결과 : ' + result_dice.toString());

    return;
};

export const roll_dice = (times: number, dice_number: number, extra_number: number, result_dice_number: number, mul_number: number) => {
    for(let i = 0; i < times; i++){
        result_dice_number += Math.floor(Math.random() * dice_number) + 1;
    }

    result_dice_number += extra_number;
    mul_number === 0 ? result_dice_number : result_dice_number *= mul_number;

    return result_dice_number;
};

export const san_dice = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content.startsWith('!sandice'))) return;
    
    const dice_command = message.content.toUpperCase().split(' ');
    dice_command.shift(); // sandice 텍스트 제거
    let result_message = '';

    const user_ability = await get_all_ability(user_id);
    const user_san = user_ability.flatMap((element) => { // 현재 이성치
        return element.san;
    });
    //여기서부터 sandice 계산시작
    let san = 0;
    const first_dice = roll_dice(1,100,0,0,0);
    const pos1 = dice_command[0].indexOf('/') + 1; // 0/3d5 이든 0/1 이던간에 앞에 숫자를 가져옴 ( 0 )
    const success_san = dice_command[0].substring(0, pos1  - 1);

    let san_flag = false;
    let san_roll_result = 0;

    if(sandice_regexp.test(dice_command[0])){ // 0/3d6의 형태인지 아닌치 확인하는 조건문
        san_flag = false;
        const pos2 = dice_command[0].indexOf('D') + 1;
        const pos3 = dice_command[0].indexOf('+')  === -1 ? dice_command[0].length : dice_command[0].indexOf('+');
        const times = dice_command[0].substring(pos1, pos2 - 1);//  2/3d6의 3을 가져옴
        const dice_number = dice_command[0].substring(pos2, pos3);//  2/3d6의 6을 가져옴
        const extra_number = dice_command[0].substring(pos3, dice_command[0].length) === '' ? '0' : dice_command[0].substring(pos3 + 1, dice_command[0].length);//  2/3d6+5의 5를 가져옴
        san_roll_result = roll_dice(Number(times), Number(dice_number), Number(extra_number), 0, 0);
    }else{
        san_flag = true;

        san_roll_result = Number(dice_command[0].substring(pos1, dice_command[0].length));
    }

    if(Number(user_san[0]) >= first_dice){
        san = user_san[0] - Number(success_san);
        await update_san(user_id, san);
        result_message = '주사위 판정 성공!';
    }else{
        const result = san_roll_result;
        san = user_san[0] - result;
        await update_san(user_id, san);
        result_message = '주사위 판정 실패!\n' + dice_command[0] + ' 판정을 하여 결과 : ' + result;
    }

    await message.channel.sendTyping();
    await message.channel.send('주사위 결과 : 1d100 = ' + first_dice + result_message);
    await message.channel.sendTyping();
    await message.channel.send('\n 이성이 ' + user_san[0] + ' => ' + san + ' 로 변경 되었습니다.');

    return;
};