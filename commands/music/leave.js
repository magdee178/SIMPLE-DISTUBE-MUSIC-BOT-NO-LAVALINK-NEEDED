const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "leave",
        aliases: ["lev", "dc"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");
        const queue = client.distube.getQueue(message);
		if (!queue) return msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            if (queue) {
                client.distube.stop(message);
                client.distube.voices.leave(message.guild);
            } else {
                client.distube.voices.leave(message.guild);
            }

            const embed = new MessageEmbed()
                .setDescription(`\`🚫\` | **غادر:** | \`${memberVoice.name}\``)
                .setColor('#2f3136')

            msg.edit({ content: ' ', embeds : [embed] });

        }

    }
}
