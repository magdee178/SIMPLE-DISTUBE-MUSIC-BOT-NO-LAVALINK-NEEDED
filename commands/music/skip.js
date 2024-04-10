const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "skip",
        aliases: ["s"],
        description: "Skips the current song.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")

        if (queue.songs.length === 1) {
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription("\`🚨\` | **لا توجد ** `أغاني` **في قائمة الانتظار**")

                msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.skip(message)
                .then(song => {
                    const embed = new MessageEmbed()
                        .setColor("#2f3136")
                        .setDescription("\`⏭\` | **الأغنية الأن:** `تم التخطي`")

                    msg.edit({ content: ' ', embeds: [embed] });
                });
        }
    }
}
