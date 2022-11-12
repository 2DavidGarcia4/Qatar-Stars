import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { botDB } from "../db.js"
import { accentsTidy, sendError } from "../utils/index.js"
import { matches } from "../index.js"
import { emojis } from "../events/ready.js"

export const timeScb = new SlashCommandBuilder()
.setName('time')
.setNameLocalizations({
  'es-ES': 'hora',
  'en-US': 'time'
})
.setDescription('Upcoming matches.')
.setDescriptionLocalizations({
  'es-ES': 'Próximos partidos.',
  'en-US': 'Upcoming matches.'
})
.addStringOption(country=> 
  country.setName('america')
  .setDescription('Continent')
  .setDescriptionLocalizations({
    'es-ES': 'Continente',
    'en-US': 'Continent'
  })
  .addChoices(
    ...botDB.continentsSelections.america.sort().map(m=> ({name: m.replace(m[0], m[0].toUpperCase()), value: m}))
  )
  .setRequired(false)
)
.addStringOption(country2=> 
  country2.setName('europe')
  .setNameLocalizations({
    'es-ES': 'europa',
    'en-US': 'europe'
  })
  .setDescription('Continent')
  .setDescriptionLocalizations({
    'es-ES': 'Continente',
    'en-US': 'Continent'
  })
  .addChoices(
    ...botDB.continentsSelections.europa.sort().map(m=> ({name: m.replace(m[0], m[0].toUpperCase()), value: m}))
  )
  .setRequired(false)
)
.addStringOption(country3=> 
  country3.setName('africa')
  .setDescription('Continent')
  .setDescriptionLocalizations({
    'es-ES': 'Continente',
    'en-US': 'Continent'
  })
  .addChoices(
    ...botDB.continentsSelections.africa.sort().map(m=> ({name: m.replace(m[0], m[0].toUpperCase()), value: m}))
  )
)
.addStringOption(country4=> 
  country4.setName('asia')
  .setDescription('Continent')
  .setDescriptionLocalizations({
    'es-ES': 'Continente',
    'en-US': 'Continent'
  })
  .addChoices(
    ...botDB.continentsSelections.asia.sort().map(m=> ({name: m.replace(m[0], m[0].toUpperCase()), value: m}))
  )
)
.addStringOption(country5=> 
  country5.setName('oceania')
  .setDescription('Continent')
  .setDescriptionLocalizations({
    'es-ES': 'Continente',
    'en-US': 'Continent'
  })
  .addChoices(
    ...botDB.continentsSelections.oceania.sort().map(m=> ({name: m.replace(m[0], m[0].toUpperCase()), value: m}))
  )
).toJSON()


export const timeSlashCommand = async (int) => {
  const { options, locale } = int, isEn = locale == 'en-US'
 
  const team = options.getString('america') || options.getString('europe') || options.getString('africa') || options.getString('asia') || options.getString('oceania')
  

  if(!team) return sendError(int, 'No selecionaste ningun equipo.')
  const teamData = matches[accentsTidy(team).replace(/ +/g, '_')]
  if(teamData.rivals.length == 0) return sendError(int, 'Ese equipo no tiene rivales.')
  const teamName = team.replace(team[0], team[0].toUpperCase())
  const emoji = emojis.find(f=> f.name.replace(/_/g, ' ') == accentsTidy(team)), txtEmoji = emoji ? `<:${emoji.name}:${emoji.id}>` : ''
  
  const list = teamData.rivals.sort((a,b)=> a.date - b.date).map((m,i)=> {
    const rvEmoji = emojis.find(f=> f.name.replace(/_/g, ' ') == accentsTidy(m.team)), rvTxEmoji = rvEmoji ? `<:${rvEmoji.name}:${rvEmoji.id}>` : '', rivalName = m.team.replace(m.team[0], m.team[0].toUpperCase())
    return `**${i+1}. ${teamName}** ${txtEmoji} vs ${rvTxEmoji} **${rivalName}**\n<t:${Math.floor(m.date/1000)}:F>\n${isEn ? 'Estadium' : 'Estadio'} [${m.stadium}](${m.url})`
  })

  const timeEb = new EmbedBuilder()
  .setTitle(`${txtEmoji} ${isEn ? 'Rivals of' : 'Rivales de'} ${teamName}`)
  .setDescription(list.join('\n\n'))
  .setColor(botDB.color)
  .setTimestamp()
  int.reply({embeds: [timeEb]})

}