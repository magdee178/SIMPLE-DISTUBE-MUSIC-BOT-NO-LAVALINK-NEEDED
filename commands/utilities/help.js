const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "utilities",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        //console.log(chalk.magenta(`[COMMAND] Help used by ${message.author.tag} from ${message.guild.name}`));
        const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setAuthor({ name: `قائمة المساعدة لـ ${message.guild.me.displayName}`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(` بادئة البوت: **${client.prefix}**`)
            embed.setFooter({ text: `تم الطلب من: ${message.guild.members.cache.get(message.author.id).displayName} | إجمالي الأوامر: ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })})

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send({ embeds: [embed] })
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("الأمر غير موجود!").setDescription(`أكتب: \`${client.prefix}help\` للحصول على قائمة الأوامر.`)] })
            command = command.config

            embed.setDescription(stripIndents` بادئة البوت: \`${client.prefix}\`\n
            **الأمر:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **الوصف:** ${command.description || "لم يتم توفير الوصف."}
            **الأستخدام:** ${command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : "لم يتم توفير الأستخدام."}
            **الأختصار:** ${command.aliases ? command.aliases.join(", ") : "لا يوجد أختصارات."}`)

            return message.channel.send({ embeds: [embed] })
        }
    }
}
