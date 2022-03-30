import { Message } from "discord.js";
// 주사위 명령어임 !dice
// 기본적으로 주사위 명령어의 형태들 == xDy+z 

export const set_dice = async (message: Message<boolean>) => {
    if(!(message.content.startsWith('!dice'))) return;

    let result_dice_number = 0;
    const dice_command = message.content.toUpperCase().split(' ');
    dice_command.shift();
    
    const pos1 = dice_command[0].indexOf('D') + 1;
    const pos2 = dice_command[0].indexOf('+') + 1 === 0 ? dice_command[0].length : dice_command[0].indexOf('+') + 1;
    
    const times = dice_command[0].substring(0, pos1-1);
    const dice_number = dice_command[0].substring(pos1, pos2);
    const extra_number = dice_command[0].substring(pos2, dice_command[0].length) === '' ? '0' : dice_command[0].substring(pos2, dice_command[0].length);

    const result_dice = roll_dice(Number(times), Number(dice_number), Number(extra_number), result_dice_number, 0);
    await message.channel.send(dice_command[0] + ' 주사위 결과 : ' + result_dice.toString())
};

export const roll_dice = (times: number, dice_number: number, extra_number: number, result_dice_number: number, mul_number: number) => {
    for(let i = 0; i < times; i++){
        result_dice_number += Math.floor(Math.random() * dice_number) + 1;
    }
    result_dice_number += extra_number;
    mul_number === 0 ? result_dice_number : result_dice_number *= mul_number;
    return result_dice_number;
};