const { MessageEmbed } = require("discord.js");
const pagequeue = require('../../structures/pagequeue.js');

module.exports = {
    config: {
        name: "queue",
        aliases: ["q", "que"],
        description: "Diplay the queue",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) message.channel.send(`لا يوجد شيء في قائمة الانتظار الآن!`).then(msg => {
            setTimeout(() => msg.delete(), 8000)
        })
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("يجب أن تكون في نفس القناة/القناة الصوتية.").then(msg => {
            setTimeout(() => msg.delete(), 8000)
        })

		const pagesNum = Math.ceil(queue.songs.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const qduration = queue.formattedDuration;

		const songStrings = [];
		for (let i = 1; i < queue.songs.length; i++) {
			const song = queue.songs[i];
			songStrings.push(
				`**__اسم الأغاني__**\n**${i}.** [${song.name}](${song.url}) \n**المدة:**\`[${song.formattedDuration}]\`\n**تم الطلب من:**\n${song.user}
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');
			const embed = new MessageEmbed()
                .setAuthor({ name: `Queue - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true })})
                .setThumbnail(queue.songs[0].thumbnail)
				.setColor('#2f3136')
				.setDescription(`**الأغنية الحالية:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \n**المدة:**\`[${queue.songs[0].formattedDuration}]\`\n**تم الطلب من:**\n${queue.songs[0].user}\n\n**قائمة الأنتظار:**${str == '' ? '  لا يوجد' : '\n' + str }`)
				.setFooter({ text: `الصفحة • ${i + 1}/${pagesNum} | الأغاني: ${queue.songs.length} | مجموع الوقت: ${queue.formattedDuration}`});
			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && queue.songs.length > 10) pagequeue(client, message, pages, 60000, queue.songs.length, qduration);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send('يجب أن تكون الصفحة رقمًا.');
			if (args[0] > pagesNum) return message.channel.send(`لا يوجد سوى ${pagesNum} الصفحات المتاحة.`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
		}
	}
}
