const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "loopqueue",
        aliases: ["lq", "loopall"],
        description: "loop the song in queue playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")

        if (queue.repeatMode === 2) {
                client.distube.setRepeatMode(message, 0);
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription(`\`🔁\` | **تعطيل تكرار الأغنية:** \`All\``)

                msg.edit({ content: ' ', embeds: [embed] });
            } else {
                client.distube.setRepeatMode(message, 2);
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription(`\`🔁\` | **تكرار الأغنية:** \`All\``)

                msg.edit({ content: ' ', embeds: [embed] });
            }
    }
}
