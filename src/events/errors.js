const { EmbedBuilder } = require("discord.js")
const { botDB } = require("../db")

const shardError = (error, client)=> {
  console.log('Error bot:')
  console.log(error.message)
  console.log(error.name)
  console.log(error.stack)
  const embErr = new EmbedBuilder()
  .setTitle(`${botDB.emojis.error} Ocurio un error`)
  .setDescription(`\`\`\`js\n${error.name}\n\n${error.message}\n\n${error.stack}\`\`\``)
  .setColor("ff0000")
  .setTimestamp()
  client.channels.cache.get(botDB.channelLogs).send({ embeds: [embErr] })
}

const unhandledRejection = (error, client)=> {
  console.log("Oter error:")
  console.log(error)
  const embErr = new EmbedBuilder()
  .setTitle(`${botDB.emojis.error} Ocurio un error`)
  .setDescription(`\`\`\`js\n${error.name}\n\n${error.message}\n\n${error.stack}\`\`\``)
  .setColor("ff0000")
  .setTimestamp()
  client.channels.cache.get(botDB.channelLogs).send({ embeds: [embErr] })
}

module.exports = {
  shardError,
  unhandledRejection
}