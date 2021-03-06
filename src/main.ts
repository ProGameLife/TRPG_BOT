import "dotenv/config";
import {
    kpc_guide,
    send_job_guide,
    send_main_guide, 
    send_equip_guide,
    send_setup_guide, 
    send_skill_guide,
    all_command_guide,
    send_ability_guide, 
    send_backstroy_guide,
    send_manual_ability_guide,
} from "./guide";
import { 
    ability_stat,
    delete_ability, 
    set_auto_ability, 
    set_manual_ability,
    check_manual_ability, 
    clear_manual_ability,
} from "./ability";
import { 
    end_user_skill,
    clear_user_skill,
    add_user_skill_list,
    get_user_all_skill_list,
} from "./skill";
import {
    add_job,
    set_p_age,
    set_p_sex,
    set_p_job,
    set_p_url,
    set_p_name,
    end_job_command,
} from "./job";
import { 
    san_dice, 
    set_dice,
} from "./dice";
import { 
    apply_tamplate,
    user_backup, 
    view_tamplate, 
    view_user_backup 
} from "./user_backup";
import { 
    add_player, 
    list_player, 
    view_user_sheet, 
    view_all_user_sheet, 
} from "./view/view";
import { create_room } from "./utill/utill";
import { make_backstory } from "./backstory";
import { clear_equip, make_equip } from "./equip";
import { edit_user_ability } from "./kpc/kpc_command";
import { Client, Intents, TextChannel } from "discord.js";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ],
});

client.on('ready', async () => {
    try{
        console.log('TRPG BOT ON');
        await send_main_guide(client);
        await all_command_guide(client);
    }catch(e){
        console.log(e);
    }
});

client.on('message',async (message) => {
    if(message.channel.type == 'DM' || message.author.bot) return;

    const user_id = message.member!.user.id;

    if(user_id === undefined || user_id === '') {
        await message.channel.send('사용자 정보를 불러오지 못했습니다. 관리자에게 문의 부탁드립니다.');
        return;
    }

    try{
        if(message.content === '!정리'){
            message.delete();
            await message.channel.bulkDelete(100);

            return;
        }

        if(message.content.startsWith('!KPC')){
            await kpc_guide(message);  
            await edit_user_ability(message); // !KPC 950231695163031603 근력 40  이렇게 입력 받으면 해당 유저의 탐사자 정보의 근력 값이 40으로 수정 된다
                        
            return;
        }
        
        if(message.content.startsWith('!가이드')){
            await send_setup_guide(message);
                        
            return;
        }
        
        if((message.content.startsWith('!특성치')) || ability_stat.start){
            await send_ability_guide(message);
            await delete_ability(message, user_id);
            await set_auto_ability(message, user_id);
            await set_manual_ability(message, user_id);
            await clear_manual_ability(message, user_id);
            await check_manual_ability(message, user_id);
            await send_manual_ability_guide(message, user_id);
                        
            return;
        }

        if((message.content.includes('기능'))){
            await send_skill_guide(message, user_id);
            await clear_user_skill(message, user_id);
            await add_user_skill_list(message, user_id);
            await get_user_all_skill_list(message, user_id);
            await end_user_skill(message);
                        
            return;
        }

        if(message.content.includes('dice')){
            await set_dice(message);
            await san_dice(message, user_id);
                        
            return;
        }
        
        if(message.content.startsWith('!탐사자 시트')){
            await view_user_sheet(message, user_id, true, '');
                        
            return;
        }

        if(message.content.startsWith('!플레이어')){
            await view_all_user_sheet(message);
            await add_player(message);
            await list_player(message);
                        
            return;
        }

        if(message.content.startsWith('!템플릿')){
            await user_backup(message);
            await view_user_backup(message);
            await view_tamplate(message);
            await apply_tamplate(message, user_id);
                        
            return;
        }

        if(message.content.startsWith('!직업') || add_job.start){
            await end_job_command(message);
            await set_p_sex(message, user_id);
            await set_p_age(message, user_id);
            await set_p_url(message, user_id);
            await set_p_job(message, user_id);
            await set_p_name(message, user_id);
            await send_job_guide(message, user_id);
                        
            return;
        }

        if(message.content.startsWith('!장비')){
            await send_equip_guide(message);
            await make_equip(message, user_id);
            await clear_equip(message, user_id);
                        
            return;
        }

        if(message.content.startsWith('!백스토리')){
            await send_backstroy_guide(message);
            await make_backstory(message, user_id);
                        
            return;
        }
    }catch(e){
        console.log(e);
    }
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) { //버튼 눌렀을 때 이벤트
        const channel = await client.channels.fetch(interaction.channelId) as TextChannel;
        await create_room(interaction, channel, client);

        return;
    }
});

client.login(process.env.BOT_TOKEN);