import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { botDB } from "../db.js";
import { qatarStarsDb } from "../models/index.js";
import { toListTeam } from "../utils/index.js";

export const phaseScb = new SlashCommandBuilder()
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

export const phaseSlashCommand = async (int, client) => {
  const { locale } = int, isEn = locale == 'en-US'
  const { color } = botDB

  const phaseEb = new EmbedBuilder()
  .setTitle(isEn ? 'The World Cup hasn started yet.' : `El mundial aún no ha comenzado`)
  // .setDescription('Aun no empieza')
  .setColor(color)
  .setTimestamp()

  int.reply({embeds: [phaseEb]})
}