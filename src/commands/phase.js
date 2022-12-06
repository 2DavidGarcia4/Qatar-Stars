const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { botDB } = require("../db");
const { qatarStarsDb } = require("../models/index");
const { toListTeam } = require("../utils/index");

const phaseScb = new SlashCommandBuilder()
.setName('phase')
.setNameLocalizations({
  'es-ES': 'fase',
  'en-US': 'phase'
})
.setDescription('Phase of the world.')
.setDescriptionLocalizations({
  'es-ES': 'Fase del mundial.',
  'en-US': 'Phase of the world.'
}).toJSON()

const phaseSlashCommand = async (int, client) => {
  const { locale } = int, isEn = locale == 'en-US'
  const { color } = botDB

  const phaseEb = new EmbedBuilder()
  .setTitle(isEn ? 'The World Cup hasn started yet.' : `El mundial aún no ha comenzado`)
  // .setDescription('Aun no empieza')
  .setColor(color)
  .setTimestamp()

  int.reply({embeds: [phaseEb]})
}

module.exports = {
  phaseScb,
  phaseSlashCommand
}