import { Message } from "discord.js";
import { get_backstory } from "./sql/select";
import { update_user_backstory } from "./sql/update";

export const make_backstory = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content.startsWith('!백스토리입력'))) return;
    let backstory = message.content.substring(message.content.indexOf(' ') + 1);
    backstory = backstory.replaceAll('.','\n');
    update_user_backstory(user_id, backstory);
    
    message.channel.send('백스토리 입력이 되었습니다. ``!탐사자 시트``으로 내용 확인을 할 수 있습니다. ');
};

export const view_backstory = async (user_id: string) => {
    const data_backstory = await get_backstory(user_id);
    const backstory = data_backstory.flatMap((element) => {
        return element.back_story;
    });
    
    return backstory[0];
};