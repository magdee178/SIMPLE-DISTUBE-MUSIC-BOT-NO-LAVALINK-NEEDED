const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new MessageEmbed()
        .setDescription(`\`📛\` | **الأغنية الأن:** \`أنتهت\``)
        .setColor('#2f3136')

    queue.textChannel.send({ embeds: [embed] })
}
