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
exports.interactionEvent = exports.data = exports.slashCommands = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../db");
const anuncio_1 = require("../commands/anuncio");
exports.slashCommands = new discord_js_1.Collection();
exports.data = { adChannelId: '' };
const cmds = [anuncio_1.anuncioScb];
cmds.forEach(cmd => exports.slashCommands.set(cmd.name, cmd));
const interactionEvent = (int, client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { emoji, color } = db_1.botDB;
    if (int.isChatInputCommand()) {
        const { commandName } = int;
        if (commandName == 'anuncio')
            (0, anuncio_1.anuncioSlashCommand)(int);
    }
    if (int.isModalSubmit()) {
        const { customId } = int;
        if (customId == 'sendEmbedModal') {
            console.log('hola');
            console.log(exports.data.adChannelId);
            const channel = (_a = int.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(exports.data.adChannelId);
            const titleM = int.fields.getTextInputValue("title");
            const descriptionM = int.fields.getTextInputValue("description");
            const colorM = int.fields.getTextInputValue("color");
            const imagen = int.fields.getTextInputValue("imagen");
            const footerText = int.fields.getTextInputValue("footerText");
            if (!(channel === null || channel === void 0 ? void 0 : channel.isTextBased()))
                return;
            // console.log({titleM, descriptionM, colorM, footerText, footerImg, chnnelId: data.adChannelId,})
            const sendEb = new discord_js_1.EmbedBuilder()
                .setTitle(`✅ Mensaje embed enviado`)
                .setColor(color.success);
            if (channel.id == int.channelId) {
                sendEb
                    .setDescription(`Mensaje enviado en este canal.`);
            }
            else {
                sendEb
                    .setDescription(`Mensaje enviado en el canal **${channel}**.`);
            }
            const sendModalEb = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: int.user.username, iconURL: int.user.displayAvatarURL() })
                .setTitle(titleM)
                .setImage(imagen || null)
                .setDescription(descriptionM)
                .setColor((colorM.includes("#") ? `#${colorM.replace("#", "")}` : `#${colorM}`) || `#${color.bot}`)
                .setFooter({ text: footerText || ' ', iconURL: ((_b = int.guild) === null || _b === void 0 ? void 0 : _b.iconURL()) || undefined });
            // if(footerText){
            //   sendModalEb
            //   .setFooter({text: footerText || ' ', iconURL: footerImg || undefined})
            // }else{
            //   sendModalEb
            //   .setFooter({iconURL: (footerImg || undefined)})
            // }
            channel.sendTyping();
            setTimeout(() => {
                channel.send({ embeds: [sendModalEb] }).then(() => {
                    int.reply({ ephemeral: true, embeds: [sendEb] });
                });
            }, 1000);
        }
    }
});
exports.interactionEvent = interactionEvent;
