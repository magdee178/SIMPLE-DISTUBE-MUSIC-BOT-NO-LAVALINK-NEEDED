const chalk = require("chalk");

module.exports = (client, id) => {
    console.log(chalk.yellowBright(`TEC | [${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Reconnecting`))
}
