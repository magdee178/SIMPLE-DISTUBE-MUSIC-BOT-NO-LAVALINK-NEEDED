const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "restart",
        description: "shuts down the client!",
        category: "utilities",
        accessableby: "Owner",
        aliases: ["stopbot"]
    },
    run: async (client, message, args) => {
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription("`❌` | **Only the bot owner can use this command!**")
      .setFooter({ text: `Requested by: ${message.guild.members.cache.get(message.author.id).displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      if(message.author.id != "1150890847768936458") return message.channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 50000)
        });
    //if(message.author.id != client.owner) return message.channel.send("You not the client the owner!")

    const restart = new MessageEmbed()
        .setDescription("**الحساب الأن:** `جاري إغلاقه...`")
        .setColor("#2f3136");

    await message.channel.send({ embeds: [restart] });
       console.log(chalk.red(`[CLIENT]: Restarting...`));
            
    process.exit();
    }
};
