const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "autoplay",
        aliases: ["ap"],
        description: "Toggles autoplay for the current guild.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**يعالج.....**");
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**لا يوجد شيء في قائمة الانتظار الآن!**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**يجب أن تكون في نفس القناة/القناة الصوتية.**")

        if (!queue.autoplay) {
            client.distube.toggleAutoplay(message);
    
            const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`\`⏯\`** تفعيل وضع **التشغيل التلقائي**.`)

            msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.toggleAutoplay(message);

            const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`\`⏯\` تعطيل وضع **التشغيل التلقائي**.`)

            msg.edit({ content: ' ', embeds: [embed] });
        }
    }
}
