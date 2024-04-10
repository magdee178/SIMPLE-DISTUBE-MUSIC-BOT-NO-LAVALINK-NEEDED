const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "previous",
        aliases: ["prev"],
        description: "Plays the previous song in the queue.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")

        if (queue.previousSongs.length == 0) {
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription("\`🚨\` | **لا يوجد** `سابقة` **أغاني**")

                msg.edit({ content: ' ', embeds: [embed] });
        } else {
            await client.distube.previous(message)
                .then(song => {
                    const embed = new MessageEmbed()
                        .setColor("#2f3136")
                        .setDescription("\`⏮\` | **الأغنية الأن:** `السابقة`")

                    msg.edit({ content: ' ', embeds: [embed] });
            });
        }
    }
}
