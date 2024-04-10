const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, queue, track) => {
      var newQueue = client.distube.getQueue(queue.id)
      var data = disspace(newQueue, track)

      const nowplay = await queue.textChannel.send(data)

      const filter = (message) => {
        if(message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
        else {
          message.reply({ content: "يجب أن تكون في نفس القناة/القناة الصوتية.", ephemeral: true });
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
            .setDescription(`\`⏯\` | **الأغنية الأن:** \`تم استئنافها\``);
    
          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await client.distube.pause(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`\`⏯\` | **الأغنية الأن:** \`تم إيقافها مؤقتاً\``);
    
          message.reply({ embeds: [embed], ephemeral: true });
        }
        } else if (id === "skip") {
          if(!queue) {
            collector.stop();
          }
          if (queue.songs.length === 1) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("\`🚨\` | **لا توجد ** `أغاني` **في قائمة الانتظار**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.skip(message)
            .then(song => {
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription("\`⏭\` | **الأغنية الأن:** `تم التخطي`")

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
              .setDescription(`\`🚫\` | **الأغنية الأن** | \`تم إيقافها\``)
              .setColor('#2f3136');
          
          await nowplay.edit({ components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "about") {
          if(!queue) {
            collector.stop();
          }
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`**للتواصل مع المطور:** __[اضغط هنا](https://discord.com/users/1150890847768936458)__\n**سيرفر الدعم الفني:** __[SOON](https://twitch.tv/4egy)__\n\n> استعمل الأمر: \`${client.prefix}about\` لترى المعلومات كاملة.`)

            message.reply({ embeds: [embed], ephemeral: true });
        } else if (id === "previous") {
          if(!queue) {
            collector.stop();
          }
          if (queue.previousSongs.length == 0) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("\`🚨\` | **لا توجد ** `سابقة` **أغاني**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.previous(message)
                const embed = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription("\`⏮\` | **الأغنية الأن:** `السابقة`")

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

  function disspace(nowQueue, nowTrack, client, PREFIX) {
    
    const embeded = new MessageEmbed()
    .setAuthor({ name: `🎵 | Starting Playing...`})
    //.setImage(nowTrack.thumbnail)
      .setThumbnail('https://cdn.discordapp.com/attachments/1220651731503812649/1227138378298949632/Picsart_24-03-20_06-09-39-451.png?ex=662750ac&is=6614dbac&hm=5352ade1cdc45df29bfa15ed5ce9050774b7ddcbdff19e8450bf736c0aab84da&')
    .setColor('#2f3136')
    .setDescription(`__أسم الأغنية:__\n**[${nowTrack.name}](${nowTrack.url})**`)
    //.addField(`Uploader:`, `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, true)
    .addField(`__تم الطلب من:__`, `${nowTrack.user}`, true)
    .addField(`__مدة الأغنية:__`, `${nowQueue.formattedDuration}`, true)
    .setTimestamp()

    const row = new MessageActionRow()
        
   //     message.channel.send({ embeds: [embed], components: [row] })
    .addComponents(
      new MessageButton()
        .setCustomId("pause")
        .setLabel("إيقاف مؤقت")
        .setEmoji("⏯")
        .setStyle("SUCCESS")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("previous")
        .setLabel("السابق")
        .setEmoji("⬅")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("stop")
        .setLabel("إيقاف التشغيل")
        .setEmoji("✖")
        .setStyle("DANGER")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("skip")
        .setLabel("تخطي")
        .setEmoji("➡")
        .setStyle("PRIMARY")
    )
   /* .addComponents(
      new MessageButton()
        .setCustomId("loop")
        .setLabel("وضع التكرار")
        .setEmoji("🔄")
        .setStyle("SUCCESS")
    ) */
    .addComponents(
                new MessageButton()
                    .setLabel("Developer")
                    .setCustomId(`about`)
                    .setEmoji("❕")
                    .setStyle("SECONDARY")
            )
    return {
      embeds: [embeded],
      components: [row]
    }
  }
