const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    config: {
        name: "about",
        aliases: ['ab'],
      accessableby: "Members",
        category: "utilities",
        description: "Information about the bot owner."
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setAuthor({ name: "Owner The Bot", iconURL: client.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`**__Name:__** [MaGdEe    ,](https://discord.com/users/1150890847768936458)\n**__From:__** [Egypt](https://youtu.be/BapSQFJPMM0?si=ZFcfSNLn3RMdZdbw)\n**__Age:__** \`21\`\nUptime Bot: <t:${Math.round(client.readyTimestamp / 1000)}:R>\nPing Bot: \`${client.ws.ping}ms\`\nBot Creation Time: <t:${Math.round(client.user.createdTimestamp / 1000)}:R>\n\n**👑 Form about the Owner The Bot 👑**\n**                      👇 Click Down 👇**`)
          .setImage("https://cdn.discordapp.com/attachments/1220651731503812649/1227026634838900746/YY52ytm.gif?ex=6626e89a&is=6614739a&hm=593a1dee0b455a53f9cec85cf5a379516708fdb885c646a397d6ab4299194c1d&")
        .setTimestamp()
        .setFooter({ text: `Made By: MaGdEe`, iconURL: message.guild.iconURL({ dynamic: true})})

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("bio.link")
                    .setURL(`https://bio.link/magdee`)
                    .setEmoji("💥")
                    .setStyle("LINK")
            )
        
        message.channel.send({ embeds: [embed], components: [row] });
    }
}
