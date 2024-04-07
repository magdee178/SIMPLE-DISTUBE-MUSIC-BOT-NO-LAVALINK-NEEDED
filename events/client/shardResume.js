const chalk = require("chalk");

module.exports = (client, id, replayedEvents) => {
    console.log(chalk.yellow(`TEC | [${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Resumed`))
}
