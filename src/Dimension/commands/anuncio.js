"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.anuncioSlashCommand = exports.anuncioScb = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../db");
const interaction_1 = require("../events/interaction");
exports.anuncioScb = new discord_js_1.SlashCommandBuilder()
    .setName('anuncio')
    .setDescription("Envía un mensaje o un mensaje embed a un canal.")
    .addSubcommand(message => message.setName("mensaje")
    .setDescription("Envía un mensaje normal a un canal.")
    .addStringOption(content => content.setName("content").setDescription("Contenido del mensaje.").setMinLength(4).setMaxLength(200).setRequired(true))
    .addChannelOption(channel => channel.setName("channel").setDescription("Canal de texto a enviar el mensaje.").addChannelTypes(discord_js_1.ChannelType.GuildText)))
    .addSubcommand(embed => embed.setName("embed")
    .setDescription("Envía un mensaje embed a un canal.")
    .addChannelOption(channel => channel.setName("channel").setDescription("Canal de texto a enviar el mensaje.").addChannelTypes(discord_js_1.ChannelType.GuildText).setRequired(false))).setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator).toJSON();
const anuncioSlashCommand = (int) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { emoji, color } = db_1.botDB;
    const sendEb = new discord_js_1.EmbedBuilder()
        .setTitle(`✅ Mensaje enviado`)
        .setColor(color.success);
    const subCommand = int.options.getSubcommand(true);
    const channel = ((_a = int.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(((_b = int.options.getChannel("channel")) === null || _b === void 0 ? void 0 : _b.id) || "")) || int.channel;
    if (!(channel === null || channel === void 0 ? void 0 : channel.isTextBased()))
        return;
    if (subCommand == "mensaje") {
        let content = int.options.getString("content", true);
        if (typeof ((_c = int.member) === null || _c === void 0 ? void 0 : _c.permissions) != "string" && !((_e = (_d = int.member) === null || _d === void 0 ? void 0 : _d.permissions) === null || _e === void 0 ? void 0 : _e.has("Administrator")))
            content.replace(/@/g, "");
        if (channel.id == int.channelId) {
            sendEb
                .setDescription(`Mensaje enviado en este canal.`);
        }
        else {
            sendEb
                .setDescription(`Mensaje enviado en el canal **${channel}**.`);
        }
        channel.sendTyping();
        setTimeout(() => {
            channel.send({ content: content }).then(() => {
                int.reply({ ephemeral: true, embeds: [sendEb] });
            });
        }, 1000);
    }
    if (subCommand == "embed") {
        interaction_1.data.adChannelId = channel.id;
        const modal = new discord_js_1.ModalBuilder()
            .setCustomId("sendEmbedModal")
            .setTitle("Mensage embed")
            .addComponents(new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.TextInputBuilder()
            .setCustomId("title")
            .setLabel("Titulo")
            .setPlaceholder("Titulo del embed...")
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setMinLength(4)
            .setRequired(true)), new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.TextInputBuilder()
            .setCustomId("description")
            .setLabel("Descripción")
            .setPlaceholder("Descripción del embed...")
            .setStyle(discord_js_1.TextInputStyle.Paragraph)
            .setMinLength(10)
            .setRequired(true)), new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.TextInputBuilder()
            .setCustomId("color")
            .setLabel("Color")
            .setPlaceholder("Color hexadecimal del embed...")
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setMinLength(6)
            .setMaxLength(7)
            .setRequired(true)
            .setValue(`${color.bot}`)), new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.TextInputBuilder()
            .setCustomId("imagen")
            .setLabel("Imagen del embed")
            .setPlaceholder("URL de una imagen.")
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setMinLength(10)
            .setRequired(false)), new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.TextInputBuilder()
            .setCustomId("footerText")
            .setLabel("Footer")
            .setPlaceholder("Texto del footer.")
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setRequired(false)));
        yield int.showModal(modal);
    }
});
exports.anuncioSlashCommand = anuncioSlashCommand;
