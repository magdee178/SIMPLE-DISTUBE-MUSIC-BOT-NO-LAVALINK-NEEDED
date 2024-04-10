const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "skipto",
        aliases: ["st"],
        description: "Skip to a song in the queue.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")

        if (isNaN(args[0])) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`من فضلك أدخل رقما صالحا!`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        await client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription(`\`⏭\` | **انتقل إلى:** ${args[0]}`)

                msg.edit({ content: ' ', embeds: [embed] });
            });
    }
}
