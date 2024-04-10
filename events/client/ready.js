const figlet = require('figlet');
const chalk = require('chalk');

module.exports = async (client) => {
  client.user.setStatus("idle")
  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log('MaGdEe | Something went wrong...');
        console.dir(err);
        return;
    }
    //console.log(chalk.red.bold(data));
    console.log(chalk.red.bold(`Loged in as ${client.user.tag}!`))
    console.log(chalk.red.bold(`Bot Id: ${client.user.id}`))
    console.log(chalk.red.bold(`Bot Prefix: ${client.config.PREFIX}`))
  });
  console.log(chalk.red.bold(`guilds: ${client.guilds.cache.size}`))

  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;
  let channels = client.channels.cache.size;

  const activities = [
      `${client.prefix}about`,
      `${client.prefix}play`,
      `${client.prefix}help`,
  ]

  setInterval(() => {
      client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, { type: 'PLAYING' });
  }, 10000)
                                                       }
