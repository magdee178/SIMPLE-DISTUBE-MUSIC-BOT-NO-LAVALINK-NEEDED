const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, song) => {
    let embed = new MessageEmbed()
    .setDescription(`**في قائمة الانتظار**\n**Name: [${song.name}](${song.url})**\n**المدة:** \`${song.formattedDuration}\`\n**تم الطلب من:**\n${song.user}`)
    .setColor('#2f3136')

    queue.textChannel.send({ content: ' ', embeds: [embed] })
}
