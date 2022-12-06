const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { botDB } = require("../db");

const botInfoScb = new SlashCommandBuilder()
.setName('botinfo')
.setDescription('🤖 Information about me.')
.setDescriptionLocalizations({
  'es-ES': '🤖 Información sobre mi.',
  'en-US': '🤖 Information about me.'
}).toJSON()

const botInfoSlashCommand = async (int, client) => {
  const { locale } = int, isEn = locale == 'en-US'
  const developer = client.users.cache.get('717420870267830382')

  const botInfo = new EmbedBuilder()
  .setTitle(`<a:information:1032709356908720149> ${isEn ? 'My information' : 'Mi información'}`)
  .setDescription(`${isEn ? 'Developed' : 'Desarrollado'} <t:${Math.floor(client.user.createdAt/1000)}:R> ${isEn ? 'by' : 'por'} *${developer.tag}* ${isEn ? 'member of' : 'miembro de'} [**Reverse Group**](https://discord.gg/RpgPWUqc4U)`)
  .setColor(botDB.color)
  int.reply({ephemeral: true, embeds: [botInfo]})
}

module.exports = {
  botInfoScb,
  botInfoSlashCommand
}