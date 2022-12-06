"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("../config");
const interaction_1 = require("./events/interaction");
const messageCreate_1 = require("./events/messageCreate");
const ready_1 = require("./events/ready");
const Bot = new discord_js_1.Client({ intents: 131071 });
Bot.on('ready', () => {
    (0, ready_1.readyEvent)(Bot);
});
Bot.on('messageCreate', (message) => {
    (0, messageCreate_1.messageCreateEvent)(message, Bot);
});
Bot.on('interactionCreate', (interaction) => {
    (0, interaction_1.interactionEvent)(interaction, Bot);
});
Bot.login(config_1.dimencionToken);
