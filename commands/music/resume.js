const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "resume",
        aliases: ["re"],
        description: "Resumes the music",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")
		
		if (queue.paused) { 
			await client.distube.resume(message);

			const embed = new MessageEmbed()
				.setColor("#2f3136")
				.setDescription(`\`⏯\` | **الأغنية الأن:** \`أستئناف التشغيل\``);

			msg.edit({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed()
				.setColor("#2f3136")
				.setDescription(`\`⏯\` | **قائمة الانتظار الأن** \`أستئناف التشغيل\``);

			msg.edit({ embeds: [embed] });
		}
    }
}
