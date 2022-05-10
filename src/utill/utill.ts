import { 
    Client,
    CacheType, 
    TextChannel,
    ButtonInteraction, 
} from "discord.js";
import { USER_ALL_GUIDE } from "../message/message_format";

export const create_room = async (interaction: ButtonInteraction<CacheType>, channel: TextChannel, client: Client<boolean>) => {
    if(!(interaction.customId === 'create_room')) return;

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
    const create_sinario_channel = await channel.guild.channels.create('시나리오', {
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
};