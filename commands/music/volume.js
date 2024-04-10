const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Changes the volume of the music playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")

        const volume = parseInt(args[0]);

        if (!volume) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`**مستوى الصوت الحالي:** \`${queue.volume}\`%`)

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (isNaN(volume)) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`من فضلك أدخل رقما صالحا`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return msg.edit(`يرجى تقديم رقم بين **1** و **100**`)

        client.distube.setVolume(message, volume);

        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`\`🔊\` | **تم تغيير مستوى الصوت إلى:** \`${args[0]}\`%`)

        msg.edit({ content: ' ', embeds: [embed] });

    }
}
