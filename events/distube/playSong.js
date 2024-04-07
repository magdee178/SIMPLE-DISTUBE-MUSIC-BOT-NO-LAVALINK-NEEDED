const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, queue, track) => {
      var newQueue = client.distube.getQueue(queue.id)
      var data = disspace(newQueue, track)

      const nowplay = await queue.textChannel.send(data)

      const filter = (message) => {
        if(message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
        else {
          message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
        }
      };
      const collector = nowplay.createMessageComponentCollector({ filter, time: 120000 });

      collector.on('collect', async (message) => {
        const id = message.customId;
        const queue = client.distube.getQueue(message.guild.id);
        if(id === "pause") {
        if(!queue) {
            collector.stop();
        } 
        if (queue.paused) { 
          await client.distube.resume(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`\`⏯\` | **Song has been:** \`Resumed\``);
    
          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await client.distube.pause(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);
    
          message.reply({ embeds: [embed], ephemeral: true });
        }
        } else if (id === "skip") {
          if(!queue) {
            collector.stop();
          }
          if (queue.songs.length === 1) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("\`🚨\` | **There are no** `Songs` **in queue**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.skip(message)
            .then(song => {
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription("\`⏭\` | **Song has been:** `Skipped`")

            nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
            });
          }
        } else if(id === "stop") {
          if(!queue) {
            collector.stop();
          }
  
          await client.distube.stop(message.guild.id);
  
          const embed = new MessageEmbed()
              .setDescription(`\`🚫\` | **Song has been:** | \`Stopped\``)
              .setColor('#2f3136');
          
          await nowplay.edit({ components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "loop") {
          if(!queue) {
            collector.stop();
          }
          if (queue.repeatMode === 0) {
            client.distube.setRepeatMode(message.guild.id, 1);
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`\`🔁\` | **Song is loop:** \`Current\``)

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
            client.distube.setRepeatMode(message.guild.id, 0);
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)

            message.reply({ embeds: [embed], ephemeral: true });
          }
        } else if (id === "previous") {
          if(!queue) {
            collector.stop();
          }
          if (queue.previousSongs.length == 0) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("\`🚨\` | **There are no** `Previous` **songs**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.previous(message)
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription("\`⏮\` | **Song has been:** `Previous`")

                nowplay.edit({ components: [] });
                message.reply({ embeds: [embed], ephemeral: true });
            }
        }
      });
      collector.on('end', async (collected, reason) => {
        if(reason === "time") {
          nowplay.edit({ components: [] });
        }
      });
  }

  function disspace(nowQueue, nowTrack) {
    const embeded = new MessageEmbed()
    .setAuthor({ name: `| Starting Playing...`, iconURL: 'https://images-ext-1.discordapp.net/external/qDlRzYzN4IgibHWG3GABUg7OiCMnIAnd9-W6PvxJp0g/%3Fsize%3D512/https/cdn.discordapp.com/icons/1063452003910553731/48dc9061e34fc318b2c2e5c0e89bca05.webp?format=webp&width=320&height=320'})
    .setThumbnail(nowTrack.thumbnail)
    .setColor('#2f3136')
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .addField(`Uploader:`, `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, true)
    .addField(`Requester:`, `${nowTrack.user}`, true)
    .addField(`Total Duration:`, `${nowQueue.formattedDuration}`, true)
    
    .setTimestamp()

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId("pause")
        .setEmoji("⏯")
        .setStyle("SUCCESS")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("previous")
        .setEmoji("⬅")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("stop")
        .setEmoji("✖")
        .setStyle("DANGER")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("skip")
        .setEmoji("➡")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("loop")
        .setEmoji("🔄")
        .setStyle("SUCCESS")
    )
    return {
      embeds: [embeded],
      components: [row]
    }
  }