const { Permissions, MessageEmbed } = require("discord.js");

module.exports = async (client, message) => { 
  if(message.content.startsWith(client.prefix+"sn")){
        if(message.author.id != "1150890847768936458") return
        let args = message.content.split(" ").slice(1).join(" ")
        if(!args)return message.reply("**أدخل الأسم الجديد**")
        let gg = client.user.setUsername(args).then(() =>{
            message.reply(` تم تغيير الأسم إلى: \`${args}\``)
        })
          const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription("> `❌` | **ماذا؟! الأسم طويل جداً جداً**\n\n> **الحد الأقصى للأسم: `32` حرف**")
     // .setFooter({ text: `Requested by: ${message.guild.members.cache.get(message.author.id).displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
gg.catch(async err => await message.reply({ embeds: [embed] }))
  }else
    if(message.content.startsWith(client.prefix+"sa")){
        if(message.author.id != "1150890847768936458") return
        let args = message.content.split(" ")
        if(!args[1])return message.reply("**أحتاج إلى رابط الصورة**")
        let gg = client.user.setAvatar(args[1]).then(() =>{
            message.reply(`**تم تغيير الأفاتار إلى:**\n\`${args[1]}\``)
        })
            const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription("> `❌` | **ماذا؟ هل هذا آفاتار؟**")
      //.setFooter({ text: `Requested by: ${message.guild.members.cache.get(message.author.id).displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        gg.catch(err => message.reply({ embeds: [embed] }))
    }else
      if(message.content.startsWith(client.prefix + "ss")){
        if(message.author.id != "1150890847768936458") return 
        const args = message.content.split(" ").slice(1).join(" ")
        if(!args) return message.reply(`**__أكتب الحالة الجديدة__**\nمثال: \`${client.prefix}ss Hi\``)
        message.reply({embeds:[new Discord.EmbedBuilder().setColor("793fdf").setDescription(`[1] Playing
        [2] Listening
        [3] Streaming
        [4] Watching
        [0] Cancel`)]})
        let filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] }).then(collected => {
        if (collected.first().content.toLowerCase() == '1') {
          message.reply({embeds:[new Discord.EmbedBuilder().setDescription('تم التغيير إلى: \`Playing\`').setColor("793fdf")]})
        client.user.setPresence({status: 'idle',activities: [{name: args,type: Discord.ActivityType.Playing}]})
        } else if (collected.first().content.toLowerCase() == '2') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('تم التغيير إلى: \`Listening\`').setColor("793fdf")]})
        client.user.setPresence({status: 'idle',activities: [{name: args,type: Discord.ActivityType.Listening}]})
        
        } else if (collected.first().content.toLowerCase() == '3') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('تم التغيير إلى: \`Streaming\`').setColor("793fdf")]})
        client.user.setPresence({status: 'idle',activities: [{name: args,type:Discord.ActivityType.Streaming,url: "https://twitch.tv/4egy"}]})
        
        } else if (collected.first().content.toLowerCase() == '4') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('تم التغيير إلى: \`Watching\`').setColor("793fdf")]})
        client.user.setPresence({status: 'idle',activities: [{name: args,type:Discord.ActivityType.Watching}]})
        
        } else if (collected.first().content.toLowerCase() == '0') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('تم الحذف').setColor("Red")]})
        }
      })
}
    if(message.author.bot || message.channel.type === "dm") return;

    const PREFIX = client.prefix;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`**لا تمنشني طيب؟ البيرفكس تبعي: \`${PREFIX}\`**`);
              message.channel.send({ embeds: [embed] })
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!command) return;
    
    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send({ content: `I don't have perm  **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute command!` }).catch(() => {});
    if(!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;
    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.channel.send({ content: `I don't have perm **\`EMBED_LINKS\`** to execute command!` }).catch(() => {});
    
    try {
        command.run(client, message, args);
    } catch (error) {
        console.log(error);
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription("There was an error executing that command.");

        return message.channel.send({ embeds: [embed] });
    }
                                  }
