const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, playlist) => {
    const embed = new MessageEmbed()
        .setDescription(`**في قائمة الانتظار**\n**Name: [${playlist.name}](${playlist.url})**\n**المدة:**\`${queue.formattedDuration}\`\n**تم الطلب من:**\n(${playlist.songs.length} tracks) • ${playlist.user}`)
        .setColor('#2f3136')
  
      queue.textChannel.send({ embeds: [embed] })
}
