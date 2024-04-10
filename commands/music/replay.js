const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "replay",
        aliases: [],
        description: "Replays the current song.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`لا يوجد شيء في قائمة الانتظار الآن!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("يجب أن تكون في نفس القناة/القناة الصوتية.")

        await queue.seek(0)

        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription("\`🔁\` | **الأغنية الأن:** `إعادة التشغيل`")

        msg.edit({ content: ' ', embeds: [embed] });
        
    }
}
