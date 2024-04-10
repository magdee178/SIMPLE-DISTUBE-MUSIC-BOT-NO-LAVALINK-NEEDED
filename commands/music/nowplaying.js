const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays the current song playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('**يعالج.....**');

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new MessageEmbed()
            .setAuthor({ name: queue.songs[0].playing ? 'Song Pause...' : 'Now Playing...', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif"})
            .setColor('#2f3136')
            .setDescription(`**Song Name:**\n**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addField('Uploader:', `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, true)
            .addField('Requester:', `${queue.songs[0].user}`, true)
            .addField('Volume:', `${queue.volume}%`, true)
            .addField('Views', `${queue.songs[0].views}`, true)
           // .addField('Likes:', `${queue.songs[0].likes}`, true)
          //  .addField('Dislikes:', `${queue.songs[0].dislikes}`, true)
            .addField(`Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``)
          
          .setFooter({ text: `Loop Mode: ${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})          
          
            .setTimestamp();

        msg.edit({ content: ' ', embeds: [embed] });
    }
				       }
																		
