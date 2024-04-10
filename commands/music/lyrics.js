const lyricsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "lyrics",
        aliases: [],
        description: "Display lyrics of a song",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("البحث عن كلمات...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")

        let song = args.join(" ");
            let CurrentSong = queue.songs[0];
        if (!song && CurrentSong) song = CurrentSong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) msg.edit("لم أتمكن من العثور على أي كلمات لهذه الأغنية!");
        } catch (err) {
            console.log(err);
            msg.edit("لم أتمكن من العثور على أي كلمات لهذه الأغنية!");
        }
        let lyricsEmbed = new MessageEmbed()
            .setColor('#2f3136')
            .setTitle(`كلمات`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setFooter({ text: `Requested by ${message.author.username}`})
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription("كلمات طويلة جدا للعرض!");
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] })
        .then(n => {
            var total = queue.songs[0].duration * 1000;
            var current = queue.currentTime * 1000;
            let time = total - current;
            setTimeout(() => { msg.delete(); }, time);
        });
    }
};
