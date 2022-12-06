const { Collection } = require("discord.js")
const { botInfoSlashCommand, botInfoScb } = require("../commands/botInfo")
const { timeSlashCommand, timeScb } = require("../commands/time")
const { newsSlashCommand, newsScb } = require("../commands/news")
const { groupsSlashCommand, gorupsScb } = require("../commands/groups")
const { phaseSlashCommand, phaseScb } = require("../commands/phase")
const { matchSlashCommand, matchScb } = require("../commands/match")

const cmds = [timeScb, newsScb, gorupsScb, phaseScb, matchScb, botInfoScb ]
const commands = new Collection()
cmds.forEach(cmd=> {
  commands.set(cmd.name, cmd)
})


const interactionEvent = async (int, client) => {
  if(int.isChatInputCommand()){
    const { commandName } = int
    
    if(commandName == 'botinfo') botInfoSlashCommand(int, client)
    if(commandName == 'time') timeSlashCommand(int)
    if(commandName == 'news') newsSlashCommand(int)
    if(commandName == 'groups') groupsSlashCommand(int, client)
    if(commandName == 'phase') phaseSlashCommand(int, client)
    if(commandName == 'match') matchSlashCommand(int, client)
  }
}

module.exports = {
  commands,
  interactionEvent
}