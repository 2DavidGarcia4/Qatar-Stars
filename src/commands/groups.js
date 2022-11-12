import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { botDB } from "../db.js"
import { toListTeam } from "../utils/index.js"

export const gorupsScb = new SlashCommandBuilder()
.setName('groups')
.setNameLocalizations({
  'es-ES': 'grupos',
  'en-US': 'groups'
})
.setDescription('All groups.')
.setDescriptionLocalizations({
  'es-ES': 'Todos los grupos.',
  'en-US': 'All groups.'
}).toJSON()

export const groupsSlashCommand = async (int, client) => {
  const { options, locale } = int, isEn = locale == 'en-US'
  const { teams } = botDB
  
  const fields = []
  for(let i=0; i<8; i++){
    const leter = (i+10).toString(20)
    fields.push({name: `${isEn ? 'Group' : 'Grupo'} ${leter.toUpperCase()}`, value: toListTeam(teams[leter]), inline: true})
  }
  
  const groupsEb = new EmbedBuilder()
  .setTitle(isEn ? 'Groups:' : `Grupos:`)
  .addFields(...fields)
  .setColor(botDB.color)
  .setTimestamp()

  int.reply({embeds: [groupsEb]})
}