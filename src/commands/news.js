const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { botDB } = require("../db");
const { emojis } = require("../events/ready");
const { accentsTidy, sendError } = require("../utils/index");
const { matches } = require("../index");

const newsScb = new SlashCommandBuilder()
.setName('news')
.setNameLocalizations({
  'es-ES': 'noticias',
  'en-US': 'news'
})
.setDescription('News about a team.')
.setDescriptionLocalizations({
  'es-ES': 'Noticias sobre un equipo.',
  'en-US': 'News about a team.'
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

const newsSlashCommand = async (int) => {
  const { options, locale } = int, isEn = locale == 'en-US'
  const team = options.getString('america') || options.getString('europe') || options.getString('africa') || options.getString('asia') || options.getString('oceania')

  if(!team) return sendError(int, 'No selecionaste ningun equipo.')

  const emoji = emojis.find(f=> f.name.replace(/_/g, ' ') == accentsTidy(team)), txtEmoji = emoji ? `<:${emoji.name}:${emoji.id}>` : '', teamName = team.replace(team[0], team[0].toUpperCase())
  const newsUrl = matches[accentsTidy(team).replace(/ +/g, '_')].news

  const newsEb = new EmbedBuilder()
  .setTitle(`${txtEmoji} ${isEn ? 'News about' : 'Noticias sobre'} **${teamName}**`)
  .setColor(botDB.color)
  .setURL(newsUrl)
  .setTimestamp()

  const newsArb = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setEmoji('🔗')
    .setLabel(isEn ? 'Page' : 'Pagina')
    .setURL(newsUrl)
    .setStyle(ButtonStyle.Link)
  )
  int.reply({embeds: [newsEb], components: [newsArb]})
} 

module.exports = {
  newsScb,
  newsSlashCommand
}