import { 
    ButtonInteraction, 
    MessageActionRow, 
    MessageButton, 
    TextChannel,
    CacheType, 
    Message,
    Client,
} from "discord.js";
import { MAIN_GUIDE, USER_ALL_GUIDE, MAKE_ABILITY_GUIDE, MAKE_ABILITY_MANUAL_GUIDE} from "./message/message_format";
import { create_first_ability } from "./sql/insert";
import { ability_stat } from "./utill/utill";

export const send_main_guide =async (client: Client<boolean>) => {
    const channel = await client.channels.fetch('956028972645376060') as TextChannel;

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('create_room')
                .setLabel('방 생성하기')
                .setStyle('SUCCESS')
        )
    
    await channel.sendTyping();
    await channel.send('>>> ' + MAIN_GUIDE);
    // +  '\n\n' + '대기중인 방 수 : ``' + ready_room + '``\n진행중인 방 수 : ``' + play_room + '``'
    await channel.send({ components: [row] });
};

export const send_ability_guide = async (message: Message<boolean>) => {
    if(!(message.content === '!특성치')) return;
    message.channel.send(MAKE_ABILITY_GUIDE);
};

export const send_setup_guide = async (message: Message<boolean>) => {
    if(!(message.content === '!가이드')) return;
    message.channel.send(USER_ALL_GUIDE);
};

export const send_manual_ability_guid = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!특성치 입력')) return;
    ability_stat.start = true;
    create_first_ability(user_id);
    message.channel.send(MAKE_ABILITY_MANUAL_GUIDE);
}

export const create_room = async (interaction: ButtonInteraction<CacheType>, channel: TextChannel, client: Client<boolean>) => {
    if(interaction.customId === 'create_room'){
        const create_room_user = await interaction.guild?.members.fetch(interaction.user.id);
        let voice_channel_name = '음성채널'+ Math.floor(Math.random() * 100);
        let category_name = create_room_user?.user.username + '의 게임방';
    
        const create_category = await channel.guild.channels.create(category_name, {
            type: 'GUILD_CATEGORY',
        });
        const create_channel = await channel.guild.channels.create('채팅방', {
            type: 'GUILD_TEXT',
            permissionOverwrites: [{
                id: channel.guild.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            }],
            parent: create_category.id,
        });
        await channel.guild.channels.create(voice_channel_name, {
            type: 'GUILD_VOICE',
            permissionOverwrites: [{
                id: channel.guild.id,
                allow: ['VIEW_CHANNEL']
            }],
            parent: create_category.id,
        });

        const new_channel = await client.channels.fetch(create_channel.id) as TextChannel; 
        await new_channel.send(USER_ALL_GUIDE);
        return;
    }
};