const { Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "play",
        aliases: ["pplay", "p"],
        description: "Plays a song from the source.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        message.channel.send(`**بحث:.....** \`${args.join(" ")}\``).then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })
        
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("يجب أن تكون في القناة الصوتية.")
        if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "I don't have perm `CONNECT` or `SPEAK` to execute command!", color: "#2f3136" } });
        if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `I don't have perm \`CONNECT\` or \`SPEAK\` in ${channel.name} to join voice!`, color: "#2f3136" } });

        const string = args.join(" ");
        if (!string) {
            return message.channel.send("يرجى تقديم اسم الأغنية أو الرابط.");
        }

        const options = {
            member: message.member,
            textChannel: message.channel,
            message
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}
