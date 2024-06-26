const { MessageEmbed } = require('discord.js');
const delay = require('delay');

module.exports = {
    config: {
        name: "3d",
        description: "Turning on 3d filter",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },
    run: async (client, message) => {
      if(message.author.id != "1150890847768936458") return message.channel.send("**__SOON__**")
        const msg = await message.channel.send("Processing.....")
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        client.distube.setFilter(message, "3d")

        const embed = new MessageEmbed()
            .setAuthor({ text: 'Turned on: 3d', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor('#2f3136');

        await delay(10000);
        msg.edit({ content: ' ', embeds: [embed] })
    }
}; /// testing version
