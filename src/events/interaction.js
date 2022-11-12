import { Collection } from "discord.js"
import { botInfoSlashCommand, botInfoScb } from "../commands/botInfo.js"
import { timeSlashCommand, timeScb } from "../commands/time.js"
import { newsSlashCommand, newsScb } from "../commands/news.js"
import { groupsSlashCommand, gorupsScb } from "../commands/groups.js"
import { phaseSlashCommand, phaseScb } from "../commands/phase.js"
import { matchSlashCommand, matchScb } from "../commands/match.js"

const cmds = [timeScb, newsScb, gorupsScb, phaseScb, matchScb, botInfoScb ]
export const commands = new Collection()
cmds.forEach(cmd=> {
  commands.set(cmd.name, cmd)
})


export const interactionEvent = async (int, client) => {
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